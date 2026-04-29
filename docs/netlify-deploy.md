# Netlify Deploy

## Build Settings

- Base directory: leave empty
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`

The repository already includes:

- [netlify.toml](../netlify.toml) for the build settings
- [public/_redirects](../public/_redirects) for SPA routing
- [public/_headers](../public/_headers) for cache and service worker headers

## Environment Variables

Add these values in `Netlify -> Site configuration -> Environment variables`:

- `VITE_BASE_PATH=/`
- `VITE_SITE_URL=https://riq.com`
- `VITE_SUPABASE_URL=https://your-project.supabase.co`
- `VITE_SUPABASE_ANON_KEY=your-supabase-publishable-key`
- `VITE_MOYASAR_PUBLIC_KEY=your_live_moyasar_public_key`
- `VITE_ANDROID_APP_URL=` optional
- `VITE_IOS_APP_URL=` optional

Notes:

- Keep `VITE_SITE_URL` equal to the final public domain used for SEO and sitemap generation.
- Do not place any secret server keys in Netlify environment variables.
- Use only the public Supabase publishable key on the web, never the secret key.
- Mobile Supabase variables are not needed for the web deployment.

## Deploy Flow

1. Connect the repository to Netlify.
2. Confirm the build settings above.
3. Add the environment variables.
4. Trigger the first deploy.
5. If you use a custom domain, add it in Netlify before the final production launch.

## Manual Dist Upload

If you deploy by uploading `dist` manually, the copied `_redirects` and `_headers` files will still keep SPA routing and the PWA headers working.
