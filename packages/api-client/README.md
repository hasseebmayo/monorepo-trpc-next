# API Client

tRPC React client for consuming the API server.

## Features

- **tRPC React Query**: Type-safe API calls with React Query
- **React Provider**: Easy setup with TRPCProvider
- **TypeScript**: Full type safety from server to client

## Installation

This package is already configured for use in the monorepo apps.

## Usage

### Setup Provider

Wrap your app with the TRPCProvider:

```tsx
import { TRPCProvider } from "@workspace/api-client";

function App() {
  return (
    <TRPCProvider apiUrl="http://localhost:3001/trpc">
      {/* Your app components */}
    </TRPCProvider>
  );
}
```

### Using the Client

```tsx
import { trpc } from "@workspace/api-client";

function UserList() {
  const { data: users, isLoading } = trpc.user.getAll.useQuery();

  const createUser = trpc.user.create.useMutation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button
        onClick={() => createUser.mutate({
          email: "test@example.com",
          name: "Test User"
        })}
      >
        Add User
      </button>
    </div>
  );
}
```

## API Reference

The client provides the same API as the server with React Query hooks:

- `trpc.user.getAll.useQuery()`
- `trpc.user.getById.useQuery({ id })`
- `trpc.user.create.useMutation()`
- `trpc.user.update.useMutation()`
- `trpc.user.delete.useMutation()`

- `trpc.post.getAll.useQuery()`
- `trpc.post.getById.useQuery({ id })`
- `trpc.post.getByAuthor.useQuery({ authorId })`
- `trpc.post.create.useMutation()`
- `trpc.post.update.useMutation()`
- `trpc.post.delete.useMutation()`
