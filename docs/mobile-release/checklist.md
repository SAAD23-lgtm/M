# Mobile Release Checklist

## Environment

- Fill [mobile/.env](/e:/Work_Websites/ريق/V2/app/mobile/.env)
- Set `EXPO_PUBLIC_WEB_BASE_URL` to the production web origin (`https://riq.com`).
- Set `EAS_PROJECT_ID` after running `eas init` or `eas project:init`.
- Set `EXPO_OWNER` only if you want to pin the owner explicitly in config.

## Assets

- App icon: [mobile/assets/icon.png](/e:/Work_Websites/ريق/V2/app/mobile/assets/icon.png)
- Adaptive icon foreground: [mobile/assets/adaptive-icon-foreground.png](/e:/Work_Websites/ريق/V2/app/mobile/assets/adaptive-icon-foreground.png)
- Splash icon: [mobile/assets/splash-icon.png](/e:/Work_Websites/ريق/V2/app/mobile/assets/splash-icon.png)
- Google Play feature graphic: [mobile/assets/feature-graphic.png](/e:/Work_Websites/ريق/V2/app/mobile/assets/feature-graphic.png)

## Validation

- `npm run mobile:preflight`
- `npm run build`
- `npm run shared:test`
- `npm run mobile:test`
- `npm run mobile:typecheck`
- `npm run mobile:doctor`
- `npm --workspace mobile exec -- expo export --platform android --output-dir .expo-export-check`

## Build and submit

- `npm run mobile:login`
- `npm run mobile:project:init`
- `npm run mobile:build:preview:android`
- `npm run mobile:build:android`
- `npm run mobile:build:ios`
- `npm run mobile:submit:android`
- `npm run mobile:submit:ios`

## Store console items still needed

- Real App Store screenshots from device/simulator builds
- Real Google Play screenshots from device builds
- Developer accounts and billing setup
- Privacy policy URL: `https://riq.com/mobile-privacy-policy.html`
- Support URL: `https://riq.com/mobile-support.html`

## Maestro

- Smoke flow: [mobile/maestro/home-smoke.yaml](/e:/Work_Websites/ريق/V2/app/mobile/maestro/home-smoke.yaml)
- Checkout success flow: [mobile/maestro/checkout-success.yaml](/e:/Work_Websites/ريق/V2/app/mobile/maestro/checkout-success.yaml)
