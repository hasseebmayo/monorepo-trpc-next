"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { trpc } from "@workspace/api-client";
import { createUserSchema } from "@workspace/drizzle/schemas";
import { z } from "zod";

type ValidationErrors = {
  name?: string;
  email?: string;
  avatar?: string;
};

export function UserDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Queries - using updated API with pagination
  const { data: response, isLoading, refetch } = trpc.user.getAll.useQuery({
    page: 1,
    limit: 10,
  });

  // Mutations
  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      refetch();
      setName("");
      setEmail("");
      setAvatar("");
      setErrors({});
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
    },
  });

  const deleteUser = trpc.user.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data using Drizzle schema
    try {
      const validatedData = createUserSchema.parse({
        name,
        email,
        avatar: avatar || undefined,
      });

      setErrors({});
      createUser.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ValidationErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading users...</div>;
  }

  const users = response?.users || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Management Demo</h1>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">🎉 Drizzle Schemas Active!</h3>
        <p className="text-blue-700 text-sm">
          This form now uses <code className="bg-blue-100 px-1 rounded">@workspace/drizzle</code> schemas
          for validation. Try submitting invalid data to see Zod validation in action!
        </p>
      </div>

      {/* Create User Form */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium mb-1">
              Avatar URL (optional)
            </label>
            <input
              id="avatar"
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                errors.avatar ? "border-red-500" : ""
              }`}
              placeholder="https://example.com/avatar.jpg"
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              This will be validated as a proper URL by the Drizzle schema
            </p>
          </div>
          <Button
            type="submit"
            disabled={createUser.isPending}
            className="w-full"
          >
            {createUser.isPending ? "Creating..." : "Create User"}
          </Button>
        </form>
      </div>

      {/* Users List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Users {response && `(${response.total} total)`}
        </h2>

        {users && users.length > 0 ? (
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex gap-4 text-xs text-gray-400">
                      <span>
                        Created: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteUser.mutate({ id: user.id })}
                  disabled={deleteUser.isPending}
                >
                  {deleteUser.isPending ? "Deleting..." : "Delete"}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No users found. Create one above!</p>
        )}
      </div>
    </div>
  );
}
