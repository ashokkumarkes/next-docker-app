# Express + TypeScript + Prisma backend

Production-oriented API with Express.js, TypeScript, Prisma ORM, and PostgreSQL.

## Prerequisites

- Node.js 18+
- PostgreSQL (running instance and a database for this app)

## Installation

1. Clone or copy this project and install dependencies:

```bash
npm install
```

2. Create a `.env` file from the example (see [Environment variables](#environment-variables)) and set `DATABASE_URL` to your PostgreSQL connection string.

3. Apply database migrations:

```bash
npx prisma migrate deploy
```

For local development you can instead use:

```bash
npm run prisma:migrate
```

(`prisma migrate dev` creates new migrations interactively and applies them.)

4. Start the server:

```bash
# development (TypeScript with nodemon)
npm run dev

# production build and run
npm run build
npm start
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run with `nodemon` + `ts-node` (watches `src/`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled app from `dist/index.js` |
| `npm run prisma:generate` | Regenerate Prisma Client |
| `npm run prisma:migrate` | `prisma migrate dev` (create/apply migrations in dev) |
| `npm run prisma:studio` | Open Prisma Studio |

## Environment variables

Copy `.env.example` to `.env` and adjust values:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=3000
NODE_ENV=development
```

`DATABASE_URL` is required at runtime (and for Prisma CLI commands that touch the database).

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Liveness check |
| `GET` | `/users` | List users |
| `POST` | `/users` | Create user (JSON body: `name`, `email`) |

Example:

```bash
curl -s http://localhost:3000/users
curl -s -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{\"name\":\"Ada\",\"email\":\"ada@example.com\"}"
```

## Project layout

```
src/
  config/       # Environment loading
  controllers/  # HTTP handlers
  errors/       # AppError and typed errors
  middleware/   # Error handling, 404
  prisma/       # Prisma client singleton
  routes/       # Route definitions
  services/     # Business logic / DB access
  utils/        # asyncHandler wrapper
prisma/
  schema.prisma
  migrations/
```

## Dependencies

**Runtime:** `express`, `@prisma/client`, `dotenv`, `cors`

**Development:** `typescript`, `ts-node`, `nodemon`, `prisma`, `@types/express`, `@types/node`, `@types/cors`

## Prisma migration command

After changing `prisma/schema.prisma`:

```bash
npm run prisma:migrate
```

Or:

```bash
npx prisma migrate dev --name your_migration_name
```

On a server or CI, apply existing migrations only:

```bash
npx prisma migrate deploy
```
