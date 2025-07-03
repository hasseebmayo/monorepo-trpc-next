# API Server

A tRPC-based API server built with Express and TypeScript.

## Features

- **tRPC**: Type-safe API with TypeScript
- **Express**: Fast, unopinionated web framework
- **Shared Types**: Uses `@workspace/types` for consistent data models
- **CORS**: Cross-origin resource sharing support
- **Health Check**: `/health` endpoint for monitoring

## Development

Start the development server:

```bash
pnpm dev
```

The server will run on `http://localhost:3001` with the tRPC endpoint at `http://localhost:3001/trpc`.

## API Routes

### Users
- `user.getAll` - Get all users
- `user.getById` - Get user by ID
- `user.create` - Create a new user
- `user.update` - Update an existing user
- `user.delete` - Delete a user

### Posts
- `post.getAll` - Get all posts (with optional published filter)
- `post.getById` - Get post by ID
- `post.getByAuthor` - Get posts by author ID
- `post.create` - Create a new post
- `post.update` - Update an existing post
- `post.delete` - Delete a post

## Building

Build the project:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Environment Variables

- `PORT` - Server port (default: 3001)
