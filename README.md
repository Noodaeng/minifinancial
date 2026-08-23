# minifinancial (minifinancial)

## Install the dependencies

```bash
pnpm install
# or: yarn/npm/bun install
```

### Start the app in development mode (HMR, error reporting, etc.)

```bash
quasar dev
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### URL for google database (on google sheet)

URL: https://script.google.com/macros/s/AKfycbwpHGRbKG66L2AWiLs_iHGDIrv__sPC7wVQUxgheZrEbneFwSxaAI8rrEFpC1Krw6wa4A/exec
Token: MiniFinancial_Secret_Token_2026_XYZ

### URL for worker cloudflare (apptawee)

"DbUrl": "https://minifinancial-worker.apptawee-api.workers.dev",
"AuthToken": "MiniFinancial_Secret_Token_2026_XYZ",

index.html/<meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 
      'self' https://minifinancial-worker.apptawee-api.workers.dev https://script.google.com https://script.googleusercontent.com<% if (ctx.dev) { %> ws://localhost:*<% } %>; worker-src 'self' blob:;"
    />

### URL for worker cloudflare (pare)

"DbUrl": "https://minifinancial-worker.pare-pare2521.workers.dev",
"AuthToken": "MiniFinancial_Secret_Token_2026_XYZ",
index.html/<meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://minifinancial-worker.apptawee-api.workers.dev https://minifinancial-worker.pare-pare2521.workers.dev https://script.google.com https://script.googleusercontent.com<% if (ctx.dev) { %> ws://localhost:*<% } %>; worker-src 'self' blob:;"
    />
