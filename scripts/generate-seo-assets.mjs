import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const dataFile = path.join(rootDir, 'src', 'data', 'products.ts');
const mode = process.env.MODE || process.env.NODE_ENV || 'production';
loadEnvFiles(mode);
const siteUrl = normalizeUrl(process.env.VITE_SITE_URL || process.env.SITE_URL || '');

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/products', priority: '0.9', changefreq: 'daily' },
  { path: '/brands', priority: '0.8', changefreq: 'weekly' },
  { path: '/offers', priority: '0.8', changefreq: 'daily' },
  { path: '/app', priority: '0.7', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

function normalizeUrl(value) {
  return String(value || '').trim().replace(/\/+$/, '');
}

function loadEnvFiles(activeMode) {
  const envFileNames = [
    '.env',
    '.env.local',
    `.env.${activeMode}`,
    `.env.${activeMode}.local`,
  ];

  for (const fileName of envFileNames) {
    const filePath = path.join(rootDir, fileName);
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const contents = fs.readFileSync(filePath, 'utf8');
    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

function unique(values) {
  return [...new Set(values)];
}

function readDynamicRoutes() {
  if (!fs.existsSync(dataFile)) {
    return {
      productRoutes: [],
      brandRoutes: [],
    };
  }

  const source = fs.readFileSync(dataFile, 'utf8');
  const productSection = source.split('// Categories')[0] || '';
  const brandSection = source.split('const rawBrands = [')[1]?.split('];')[0] || '';

  const productRoutes = unique(
    [...productSection.matchAll(/id:\s*'([^']+)'/g)].map((match) => `/product/${match[1]}`),
  );
  const brandRoutes = unique(
    [...brandSection.matchAll(/id:\s*'([^']+)'/g)].map((match) => `/brand/${match[1]}`),
  );

  return {
    productRoutes,
    brandRoutes,
  };
}

function buildRobotsFile() {
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /checkout',
    'Disallow: /cart',
  ];

  if (siteUrl) {
    lines.push(`Sitemap: ${siteUrl}/sitemap.xml`);
  }

  return `${lines.join('\n')}\n`;
}

function buildSitemapFile(routes) {
  const urls = routes
    .map((route) => {
      const absoluteUrl = `${siteUrl}${route.path === '/' ? '' : route.path}`;
      const priority = route.priority ?? '0.7';
      const changefreq = route.changefreq ?? 'weekly';

      return [
        '  <url>',
        `    <loc>${absoluteUrl}</loc>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

function writeFile(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, 'utf8');
}

const { productRoutes, brandRoutes } = readDynamicRoutes();

writeFile(path.join(publicDir, 'robots.txt'), buildRobotsFile());

const sitemapPath = path.join(publicDir, 'sitemap.xml');
if (siteUrl) {
  const dynamicRoutes = [
    ...productRoutes.map((route) => ({ path: route, priority: '0.7', changefreq: 'weekly' })),
    ...brandRoutes.map((route) => ({ path: route, priority: '0.7', changefreq: 'weekly' })),
  ];

  writeFile(
    sitemapPath,
    buildSitemapFile([...staticRoutes, ...dynamicRoutes]),
  );
} else if (fs.existsSync(sitemapPath)) {
  fs.unlinkSync(sitemapPath);
}
