# Shared Types

Shared TypeScript types and Zod schemas for the monorepo.

## Features

- **Zod Schemas**: Runtime validation with TypeScript types
- **User Types**: User-related schemas and types
- **Post Types**: Post-related schemas and types
- **API Response Types**: Standardized API response formats

## Usage

```typescript
import { User, CreateUserSchema, ApiResponse } from "@workspace/types";

// Use the types
const user: User = {
  id: "1",
  email: "john@example.com",
  name: "John Doe",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Validate data
const userData = CreateUserSchema.parse({
  email: "john@example.com",
  name: "John Doe",
});
```

## Available Types

### User Types
- `User` - Complete user object
- `CreateUser` - User creation data
- `UpdateUser` - User update data
- `UserSchema`, `CreateUserSchema`, `UpdateUserSchema` - Zod schemas

### Post Types
- `Post` - Complete post object
- `CreatePost` - Post creation data
- `UpdatePost` - Post update data
- `PostSchema`, `CreatePostSchema`, `UpdatePostSchema` - Zod schemas

### API Types
- `ApiResponse<T>` - Standard API response format
- `PaginatedResponse<T>` - Paginated API response format
