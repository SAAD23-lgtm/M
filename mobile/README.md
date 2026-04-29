# Riq Mobile

Expo Router mobile app for `Riq Store`.

## Setup

1. Fill the local [mobile/.env](</e:/Work_Websites/ريق/V2/app/mobile/.env>) file.
2. Set `EXPO_PUBLIC_WEB_BASE_URL` to the deployed web app origin that serves `/checkout/mobile`. The production value for this project is `https://riq.com`.
3. Set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` to enable the optional in-app account flow.
4. Apply the SQL in [mobile/supabase/account-schema.sql](</e:/Work_Websites/ريق/V2/app/mobile/supabase/account-schema.sql>) to your Supabase project and enable Email OTP in Supabase Auth.
5. Set `EAS_PROJECT_ID` after creating or linking the Expo project in EAS. `EXPO_OWNER` is optional once the project id is present.
6. Run `npm run mobile:preflight` from the repo root to validate assets, tests, build output, and missing release inputs.
7. Run `npm run mobile:dev` from the repo root.

## Useful commands

- `npm run mobile:dev`
- `npm run mobile:preflight`
- `npm run mobile:login`
- `npm run mobile:project:init`
- `npm run mobile:whoami`
- `npm run mobile:test`
- `npm run mobile:typecheck`
- `npm run mobile:doctor`
- `npm run mobile:build:preview:android`
- `npm run mobile:build:android`
- `npm run mobile:build:ios`
- `npm run mobile:submit:android`
- `npm run mobile:submit:ios`

## Payment bridge

- The mobile checkout saves the payload in local storage inside the app.
- The payment screen opens the web route `/checkout/mobile` in a WebView.
- On success or cancel, the web route returns control to the app using `riqstore://checkout/result?...`.
- If the shopper is signed in, the successful order is also written to Supabase and shown later in the in-app account screen.

## Store assets

- App icon: `mobile/assets/icon.png`
- Adaptive icon: `mobile/assets/adaptive-icon-foreground.png`
- Splash icon: `mobile/assets/splash-icon.png`
- Google Play feature graphic: `mobile/assets/feature-graphic.png`

## Maestro

- Flow files live in [mobile/maestro](</e:/Work_Websites/ريق/V2/app/mobile/maestro>)
- Run `maestro test mobile/maestro/home-smoke.yaml`
- Run `maestro test mobile/maestro/checkout-success.yaml`
