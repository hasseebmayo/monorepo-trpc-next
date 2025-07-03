# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui, tRPC API, and shared types.

## Structure

```
├── apps/
│   ├── api/          # tRPC API server
│   └── web/          # Next.js web application
└── packages/
    ├── api-client/   # tRPC React client
    ├── types/        # Shared TypeScript types and Zod schemas
    ├── ui/           # Shared UI components with shadcn/ui
    ├── eslint-config/# Shared ESLint configuration
    └── typescript-config/ # Shared TypeScript configuration
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start development servers:

```bash
# Start all apps in development mode
pnpm dev

# Or start individual apps
pnpm --filter=@workspace/api dev    # API server on :3001
pnpm --filter=@workspace/web dev    # Web app on :3000
```

## API Server

The API server uses tRPC for type-safe APIs with the following features:

- **Express**: Fast web framework
- **tRPC**: Type-safe API layer
- **Shared Types**: Uses `@workspace/types` for consistent schemas
- **CORS**: Cross-origin resource sharing

### API Endpoints

- **Users**: CRUD operations for user management
- **Posts**: CRUD operations for post management
- **Health Check**: `/health` endpoint for monitoring

## Usage

### Adding shadcn/ui components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

### Using UI components

```tsx
import { Button } from "@workspace/ui/components/button"
```

### Using the API client

In your React components:

```tsx
import { trpc } from "@workspace/api-client";

function UserList() {
  const { data: users, isLoading } = trpc.user.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Adding new types

Add shared types in `packages/types/src/index.ts`:

```typescript
import { z } from "zod";

export const MySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type MyType = z.infer<typeof MySchema>;
```

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.
