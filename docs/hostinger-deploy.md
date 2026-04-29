# Riq Deployment Notes

## Web on Hostinger

1. Set the live Moyasar public key in [/.env.production](/e:/Work_Websites/ريق/V2/app/.env.production).
2. Run `npm run web:package:hostinger` from the repo root.
3. Upload the generated archive [release/riq-hostinger-web.zip](/e:/Work_Websites/ريق/V2/app/release/riq-hostinger-web.zip) to Hostinger `public_html`, then extract it there.
4. Make sure the extracted files sit directly inside `public_html` and that `.htaccess` is present.
5. Point `riq.com` to the Hostinger hosting plan and keep `https://riq.com` as the canonical production origin.

## What is already prepared

- `dist/` is built as a static Vite app ready for shared hosting.
- [public/.htaccess](/e:/Work_Websites/ريق/V2/app/public/.htaccess) rewrites all SPA routes to `index.html` so deep links like `/product/...` and `/checkout/mobile` keep working on Hostinger.
- `robots.txt` and `sitemap.xml` are generated during `npm run build` using `VITE_SITE_URL=https://riq.com`.
- Mobile store support and privacy URLs are now set to:
  - `https://riq.com/mobile-support.html`
  - `https://riq.com/mobile-privacy-policy.html`

## Mobile build

1. Confirm [mobile/.env](/e:/Work_Websites/ريق/V2/app/mobile/.env) contains `EXPO_PUBLIC_WEB_BASE_URL=https://riq.com`.
2. Run `npm run mobile:preflight`.
3. Build Android with `npm run mobile:build:android`.
4. Build iOS with `npm run mobile:build:ios`.

## Remaining manual items

- Paste the real live `VITE_MOYASAR_PUBLIC_KEY` before enabling production checkout.
- Stay logged into Expo/EAS on this machine for mobile builds.
- Finish Google Play / App Store submission from your developer accounts.
