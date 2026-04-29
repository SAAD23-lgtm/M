# Maestro Flows

These flows cover the basic storefront smoke path and a simulated checkout success path.

## Run

1. Install Maestro: `curl -Ls "https://get.maestro.mobile.dev" | bash`
2. Boot the app on a simulator or device.
3. Run one of the flows:

- `maestro test mobile/maestro/home-smoke.yaml`
- `maestro test mobile/maestro/checkout-success.yaml`

## Notes

- `checkout-success.yaml` simulates the payment provider return by opening the app deep link directly.
- The flow expects the app bundle id / package id to stay `com.riq.store`.
