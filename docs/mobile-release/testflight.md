# TestFlight iPhone Install Link

Use this path when the iPhone app needs to install from one tap without the Safari PWA flow.

## Requirements

- Apple Developer Program access.
- App Store Connect access for `Riq Store`.
- A successful iOS production build from the `mobile` workspace.

## Build and Upload

1. Sign in to Expo/EAS:
   `npm run mobile:login`
2. Confirm the EAS project is linked:
   `npm run mobile:project:init`
3. Build iOS:
   `npm run mobile:build:ios`
4. Submit the latest iOS build to App Store Connect:
   `npm run mobile:submit:ios`
5. In App Store Connect, open TestFlight and create or enable a public link.

## Connect the Website Button

Set the public link in the web production environment:

```env
VITE_IOS_APP_URL=https://testflight.apple.com/join/XXXXXXXX
```

Then rebuild and redeploy the web app. On iPhone, `/app` will show `نزّل تطبيق iPhone الآن` and open TestFlight directly.
