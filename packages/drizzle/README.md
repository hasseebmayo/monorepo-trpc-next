# @workspace/drizzle

This package contains the database schema definitions and Zod validation schemas for the monorepo.

## Features

- **Database Schema**: PostgreSQL tables defined with Drizzle ORM
- **Zod Schemas**: Auto-generated and custom validation schemas
- **Type Safety**: Full TypeScript support with inferred types
- **Shared**: Used across frontend and backend applications

## Usage

### Import schemas for validation

```typescript
import {
  createUserSchema,
  getUserParamsSchema,
  createPostSchema,
  User,
  Post
} from "@workspace/drizzle/schemas";

// Validate user input
const userData = createUserSchema.parse(req.body);

// Validate route parameters
const { id } = getUserParamsSchema.parse(req.params);
```

### Import database connection

```typescript
import { db, users, posts, eq } from "@workspace/drizzle";

// Query users
const allUsers = await db.select().from(users);

// Query with conditions
const user = await db.select().from(users).where(eq(users.id, 1));
```

## Database Operations

### Generate migrations

```bash
pnpm db:generate
```

### Run migrations

```bash
pnpm db:migrate
```

### Open Drizzle Studio

```bash
pnpm db:studio
```

### Push schema to database (development)

```bash
pnpm db:push
```

## Environment Variables

Make sure to set the following environment variable:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

## Schema Structure

### Users Table
- `id` - Serial primary key
- `email` - Unique email address
- `name` - User's display name
- `avatar` - Optional avatar URL
- `emailVerified` - Email verification status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Posts Table
- `id` - Serial primary key
- `title` - Post title
- `content` - Post content
- `excerpt` - Optional excerpt
- `authorId` - Foreign key to users table
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Adding New Schemas

1. Create a new file in `src/schemas/`
2. Define your table using Drizzle ORM
3. Create Zod validation schemas using `createInsertSchema` and `createSelectSchema`
4. Export types and schemas
5. Add exports to `src/schemas/index.ts`
