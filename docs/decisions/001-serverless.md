# ADR 001 — Migration of Coffee API to Serverless/Edge

- **Status:** Accepted
- **Date:** 2026-08-05 (migration start, per available history)
- **Scope:** Execution architecture and structural organization of the Coffee API
- **Related decisions:** Hono, Cloudflare Workers, and Vertical Slice Architecture

## Context

The Coffee API originally featured an architecture based on a traditional HTTP server using Koa. As the project evolved, a decision was made to migrate the API to a **Serverless/Edge** model, utilizing **Cloudflare Workers** as the execution environment and **Hono** as the HTTP framework.

The migration was not treated merely as a framework swap. It required rethinking how the application initializes, how requests are processed, how dependencies are organized, and how the application accesses external resources—particularly given the specific characteristics of the Serverless/Edge runtime.

It was also decided to adopt **Vertical Slice Architecture** as the principle for code organization. This decision aligns with the migration because it allows the application to be organized by functionality (feature slices), reducing reliance on a global structure based exclusively on technical layers.

## Decision

The Coffee API will run as a **Serverless/Edge** application, utilizing **Cloudflare Workers** as the execution environment and **Hono** as the HTTP framework.

The application's primary unit of execution will not be a traditional Node.js server started and maintained by the application process. The entry point must be compatible with the Workers execution model, wherein the platform receives requests and invokes the application as needed.

The architecture will also adopt **Vertical Slice Architecture** as the primary strategy for organizing functionality.

The migration must preserve existing business responsibilities whenever possible while adapting technical boundaries to the characteristics of the new runtime. ## Motivations

The recorded motivations for the migration are:

1. Adopting a Serverless/Edge model for API execution.
2. Using Cloudflare Workers infrastructure as the execution environment.
3. Using Hono as the HTTP framework suited to the Workers/Edge environment.
4. Avoiding the carry-over of assumptions specific to a traditional Node.js server into the new environment.
5. Reorganizing the application around features using Vertical Slice Architecture.
6. Leveraging the migration to establish an architecture better suited to the chosen execution model.

> **Historical note:** Available records document the decision to migrate to Serverless/Edge and the adoption of Hono/Cloudflare, but do not record formal cost, latency, or performance metrics used as quantitative justification. Therefore, these metrics are not considered documented motivations for this decision.

## Evolution of the decision

### 1. Previous architecture based on Koa

The Coffee API used Koa as its HTTP framework and featured a traditional web application structure, with components such as `app.ts`, middleware, and a separation of controllers, services, and models.

This architecture operated like a traditional server-based application.

### 2. Decision to migrate to Serverless

Migration of the application to Serverless/Edge began in August 2026.

The goal shifted to building the API specifically for the Cloudflare Workers runtime, rather than retrofitting an existing Koa/Node.js application for that environment.

A conscious decision was made to rebuild the API's infrastructure from scratch—preserving useful architectural patterns and domain knowledge—without treating the Koa code as a mandatory implementation for the new runtime.

### 3. Choice of Hono

Hono was selected as the HTTP framework for the new implementation. Routes are now defined using `Hono` instances, and handlers utilize the `Context` provided by the framework.

Conceptual example of the new approach:

```ts
const categoryRoutes = new Hono();

categoryRoutes.get("/categories", CategoryController.index);
```

The final implementation must adhere to the existing code structure; this example serves merely to document the evolution.

### 4. Adapting controllers and services

The migration required adapting controllers and services that were previously tied to the Koa execution model.

In Hono, handlers receive the request `Context` and utilize the framework's built-in mechanisms, such as:

- `c.req` to access request data;
- `c.req.param()` for route parameters;
- `c.req.json()` for JSON bodies;
- Hono context response methods.

Services remain a viable option for encapsulating application logic, but the architecture no longer mandates a rigid global separation based exclusively on `controllers/`, `services/`, and `models/`.

### 5. Adopting Vertical Slice Architecture

During the definition of the new architecture, the decision was made to adopt **Vertical Slice Architecture**.

The primary unit of organization becomes the feature itself, rather than the technical file type.

Consequently, concepts such as controllers/handlers, services/use cases, validation, and data access can remain close to the feature they belong to, whenever it makes sense to do so.

Adopting Vertical Slice Architecture does not mean that classes like services, repositories, or models are prohibited. It means that their location and responsibility should be determined by the feature and the application flow, rather than by a requirement to create global directories for each component type.

### 6. Initial testing and validation

Before proceeding with the architectural migration, a test setup was established using **Vitest**, with support for TypeScript aliases via `vite-tsconfig-paths`.

The initial phase of the new configuration was successfully completed, with tests passing and the API running.

This validation served as the foundation for continuing the evolution of the Serverless/Hono implementation.

## Positive outcomes

### Compatibility with the Serverless/Edge model

The application is now designed specifically for a Workers runtime, reducing the need to maintain abstractions specific to a traditional Node.js server.

### Separation of domain and infrastructure

The migration encourages distinguishing between responsibilities belonging to the domain/application and those dependent on the execution environment.

### Organization by feature

Vertical Slice Architecture allows a feature to be understood in a localized manner, reducing the need to navigate through multiple global technical directories to comprehend a specific flow.

### Independent feature evolution

Different features can evolve with reduced structural coupling, provided their interfaces and dependencies remain well-defined.

## Consequences and trade-offs

### Shift in execution mental model

Developers accustomed to a persistent Node.js server must consider the characteristics of the Serverless/Edge runtime.

One should not assume that in-memory process state, one-time application initialization, or specific features of traditional Node.js will be available in the same way.

### Dependency adaptation

Dependencies used by the application must be compatible with the chosen environment. Libraries relying on specific Node.js APIs may require replacement or adaptation.

### Structural change

Migration may require moving or restructuring components that were previously organized in global directories such as `controllers`, `services`, and `models`.

### Greater focus on infrastructure

Environment configurations, bindings, databases, secrets, and external resources need to be handled in accordance with the Cloudflare Workers model.

### Incremental migration

During migration, a mix of concepts from the previous and new architectures may temporarily coexist. This situation should be treated as a transitional state rather than the final architectural goal.

## Alternatives considered

### Staying with Koa on a traditional server

This was not chosen as the final architecture. The project decided to proceed with Serverless/Edge and build the new implementation with the chosen runtime in mind from the start.

### Maintaining a strictly layered global architecture

The traditional structure based on global directories for `controllers`, `services`, `models`, and the like was considered during the project's evolution, but the final decision was to use Vertical Slice Architecture as the primary organizational approach.

This does not eliminate layers or responsibilities; it simply prevents the project's physical structure from being determined exclusively by global technical categories.

### Adapting Koa directly for the Serverless environment

This approach was not adopted as the primary strategy. The project opted to treat the new API as a Serverless/Hono implementation rather than preserving the lifecycle of a traditional Koa application.

## Impact on the API

The architectural migration does not, in itself, imply a change to the API's functional contract.

Endpoints, business rules, authentication, and response formats must be preserved during the migration unless there is an explicit decision to change them.

When a change in behavior is required due to the new runtime or a design decision, it must be documented separately.

## Rules resulting from this decision

1. New code must be compatible with the target Cloudflare Workers runtime.
2. Node.js dependencies incompatible with Workers must not be introduced without explicit technical justification.
3. The traditional server lifecycle should not be assumed to be available.
4. New features should preferably be organized as vertical slices.
5. Shared components should be extracted only when there is a genuine need for sharing.
6. Cloudflare-specific infrastructure should remain separate from business rules whenever possible.
7. Changes to the public API contract must be documented independently of this architectural decision.
8. The current code is the source of truth for the implementation state; this ADR records the decision and its historical context but does not replace the implementation.

## Current Status

This decision serves as the architectural foundation for migrating the Coffee API to Serverless/Edge.

The implementation must be continuously evaluated to ensure the project's physical structure aligns with the **Hono + Cloudflare Workers + Vertical Slice Architecture** decisions, avoiding the retention of legacy Koa structures solely for the sake of historical compatibility.

## ADR Change History

| Date | Change |
| --- | --- |
| 2026-08-05 | Initiation of API migration to Serverless/Edge and definition of a new implementation based on the target runtime. |
| 2026-08-07 | Definition of routes using Hono and adaptation of the HTTP layer to the Hono handler/context model. |
| 2026-08-12 | Continued adaptation of routes, authentication/authorization, and controllers to Hono. |
| 2026-08-21 | Evolution of the controller approach for Serverless/Cloudflare execution. |
| 2026-08-22 | Adaptation of existing services to the new Hono architecture. |
| 2026-09-30 | Consolidation of this documentation as an ADR, gathering decisions and recurring points recorded in the project's available history. |

## Internal references

- `architecture/` — description of the current architecture.
- `deployment/` — details of the Serverless/Cloudflare environment.
- `testing/` — testing strategy and configuration.
- `decisions/002-hono.md` — specific decision regarding Hono, if created.
- `decisions/003-vertical-slice.md` — specific decision regarding Vertical Slice Architecture, if created.

---
[← Voltar para o README](../../README.md)
