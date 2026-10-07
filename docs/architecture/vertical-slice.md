# Structure

## Documents

Technical and business documentation, architecture diagrams, architecture decision records (ADRs), database schemas, and OpenAPI specifications.

```bash
coffee-api/
├── docs/
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── vertical-slice.md
│   │   └── order-state-machine.md
│   ├── database/
│   │   ├── schema.md
│   │   └── migrations.md
│   ├── decisions/
│   │   ├── 001-serverless.md
│   │   ├── 002-authentication.md
│   │   └── 003-error-handling.md
│   └── deployment/
│       ├── environment.md
│       └── ci-cd.md
```

## Script

Utilities and automation scripts, such as database initialization, data seeding, and fixes.

```bash
coffee-api/
├── scripts/
│   ├── fix-alias.js
│   └── seed-menu.js
```

## Config

Core application configuration and static/runtime validation of environment variables using Zod.

```bash
coffee-api/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── swaggert.ts
│   │   └── env.ts
```

## Infrastructure

Communication and integration with external services, including database clients (Postgres/Drizzle/Supabase), logging systems, notification delivery (Push and WhatsApp), and payment gateways (Mercado Pago, Stripe, Pix).

```bash
coffee-api/
├── src/
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── client.ts
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── logger/
│   │   │   └── logger.ts
│   │   ├── notifications/
│   │   │   └── push.service.ts
│   │   └── payment/
│   │       └── payment-gateway.ts
```

## Middleware

Global HTTP interceptors and middleware for authentication, centralized error handling, request tracing, security headers, and schema validation.

```bash
coffee-api/
├── src/
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── request-id.middleware.ts
│   │   ├── security.middleware.ts
│   │   ├── upload.middleware.ts
│   │   └── validate.middleware.ts
```

## Modules

Application domain modules organized by vertical slice. These contain business logic for user authentication, catalog/menu management, order lifecycle creation and updates, geolocation-based delivery fee calculation, payment and webhook processing, and store operating hours management.

```bash
coffee-api/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── me/
│   │   ├── catalog/
│   │   │   ├── list-products/
│   │   │   │   ├── handler.ts
│   │   │   │   ├── schema.ts
│   │   │   │   └── dto.ts
│   │   │   ├── get-product/
│   │   │   └── common/
│   │   │       ├── catalog.repository.ts
│   │   │       └── catalog.types.ts
│   │   ├── orders/
│   │   │   ├── create-order/
│   │   │   │   ├── handler.ts
│   │   │   │   ├── schema.ts
│   │   │   │   └── dto.ts
│   │   │   ├── update-status/
│   │   │   │   ├── handler.ts
│   │   │   │   └── state-machine.ts
│   │   │   ├── get-order/
│   │   │   ├── list-active-orders/
│   │   │   └── common/
│   │   │       ├── order.repository.ts
│   │   │       └── order.types.ts
│   │   ├── delivery/
│   │   │   ├── calculate-fee/
│   │   │   │   ├── handler.ts
│   │   │   │   └── schema.ts
│   │   │   └── address/
│   │   ├── payments/
│   │   │   ├── process-pix/
│   │   │   └── webhook/
│   │   │       └── handler.ts
│   │   └── store/
│   │       ├── get-status/
│   │       └── update-hours/
```

## Shared

Shared modules, imports, reusable helpers (such as geographic calculations and currency formatting), global TypeScript types, and custom error classes.

```bash
coffee-api/
├── src/
│   └── shared/
│       ├── errors/
│       ├── types/
│       ├── helpers/
│       └── utils/
│           ├── geo.ts
│           └── money.ts
```

## Test

Directory reserved for the suite of automated unit, integration, and end-to-end (E2E) tests.

```bash
coffee-api/
├── tests/
│   ├── integration/
│   └── e2e/
```

## Configuration files

```bash
coffee-api/
├── .env
├── .env.example
├── .gitignore
├── .nvmrc
├── .prettierrc
├── eslint.config.js
├── package.json
├── tsconfig.json
├── wrangler.jsonc
└── README.md
```

---

[← Voltar para o README](../../README.md)
