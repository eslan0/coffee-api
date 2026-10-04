# Coffee API

Coffee API is a compact RESTful API project for small businesses. Developed with Hono.js, Postgres and TypeScript.

> C.R.U.D, Filter, Paginate, Sort and Search API

## Table of contents

- [Preview](#preview)
- [Technologies](#technologies)
- [Documentation](#documentation)
- [Routes](#routes)
- [Use](#use)
- [Features](#features)
- [Security](#security)
- [Variables](#variables)
- [Collaboration](#collaboration)

## Preview

[API Base URL](http://localhost:5000/v1.0.5)

[Swagger Docs](http://localhost:5000/v1.0.5/docs)

## Technologies

- Node.js
- Hono.js
- Postgres
- TypeScript
- JSON Web Token (JWT)
- bcryptjs
- Swagger (OpenAPI)

## Documentation

Interactive API documentation is available via Swagger:

```bash
http://localhost:5000/v1.0.5/docs
```

Browse the links below to access detailed project documentation:

### Architecture

- [Overview](docs/architecture/overview.md)
- [Vertical Slice Architecture](docs/architecture/vertical-slice.md)
- [Order State Machine](docs/architecture/order-state-machine.md)

### Database

- [Schema and Data Model](docs/database/schema.md)
- [Migration History](docs/database/migrations.md)

### Architecture Decision Records (ADRs)

- [001 - Serverless Architecture](docs/decisions/001-serverless.md)
- [002 - Authentication Strategy](docs/decisions/002-authentication.md)
- [003 - Global Error Handling](docs/decisions/003-error-handling.md)

### Deployment and Infrastructure

- [Environment Variables](docs/deployment/environment.md)
- [CI/CD Pipeline](docs/deployment/ci-cd.md)

### API Specification

- [OpenAPI Spec (YAML)](docs/openapi/openapi.yaml)
- [API Documentation](docs/openapi/api-spec.yaml)

## Routes

| Method |     Endpoint     | Description       | Authentication |
| :----: | :--------------: | :---------------- | :------------: |
|  GET   |       `/`        | API health check  |       No       |
|  POST  |     `/login`     | Authenticate user |       No       |
|  GET   |     `/users`     | Get all users     |      Yes       |
|  POST  |     `/users`     | Create a new user |      Yes       |
|  GET   |  `/users/{id}`   | Get user by ID    |      Yes       |
|  PUT   |  `/users/{id}`   | Update user       |      Yes       |
|  GET   |   `/products`    | Get all products  |       No       |
|  GET   | `/products/{id}` | Get product by ID |       No       |
|  GET   |    `/orders`     | Get all orders    |      Yes       |
|  GET   |  `/orders/{id}`  | Get order by ID   |      Yes       |
|  POST  |    `/orders`     | Create order      |      Yes       |
|  PUT   |  `/orders/{id}`  | Update order      |      Yes       |
| DELETE |  `/orders/{id}`  | Delete order      |      Yes       |

## Use

1.**Clone the repository:**
[https://github.com/eslan0/coffee-api.git](https://github.com/eslan0/coffee-api.git)

```bash
git clone https://github.com/eslan0/coffee-api
cd coffee-api
```

2.**Install dependencies**

```bash
yarn install
# or
npm install
```

3.**Configure environment variables**

Create a `.env` file based on `.env.example`

4.**Run the project**

```bash
npm run dev
```

5.**Deploy for production**

```bash
npm run deploy
```

## Features

### (Users)

- Complete user authentication
- Users can sign in
- Users can sign out
- Users can verify email
- Users can Change Password
- View all products
- View products detail
- Filter products by category
- Search for products
- Add products to their basket
- Checkout total payment

### (Admin)

- Complete Admin Authorization
- Add products
- Update products
- Delete products
- Limit Products
- Add Users
- Update Users
- Delete Users
- Update User Role

## Security

- JWT authentication (access + refresh tokens)
- Password hashing with bcrypt
- Rate limiting global
- HTTP security headers (Helmet)
- Cross-Origin Resource Sharing (CORS)

## Variables

Create a `.env` file and configure:

```env
USE_MEMORY_DB=
TOKEN_SECRET=
API_URL=
API_VERSION=
JWT_EXPIRE_TIME=
SEND_GRID_API_KEY=
ADMIN_SEND_GRID_EMAIL=
ADMIN_EMAILS=
MANGER_EMAILS=
MODERATOR_EMAILS=
SUPERVISOR_EMAILS=
GUIDE_EMAILS=
NODE_ENV=
CLIENT_URL=
ACCESS_TOKEN_SECRET_KEY=
REFRESH_TOKEN_SECRET_KEY=
ACCESS_TOKEN_KEY_EXPIRE_TIME=
REFRESH_TOKEN_KEY_EXPIRE_TIME=
STRIPE_SECRET_KEY=
STRIPE_PUBLIC_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

To run this project, you will need to add the following environment variables to your `.env` file (check `.env.example` file for more examples)

## Collaboration

[Es](https://github.com/Eslan0)

[Elias Abreu](https://github.com/eliasabrell)
