"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { trpc } from "@workspace/api-client";

export function UserDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Queries
  const { data: users, isLoading, refetch } = trpc.user.getAll.useQuery();
  // Mutations
  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      refetch();
      setName("");
      setEmail("");
    },
  });

  const deleteUser = trpc.user.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      createUser.mutate({ name, email });
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading users...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Management Demo</h1>

      {/* Create User Form */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter email"
              required
            />
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
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        {users && users.length > 0 ? (
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
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
