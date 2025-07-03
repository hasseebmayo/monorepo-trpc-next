import { Button } from "@workspace/ui/components/button"
import { UserDemo } from "@/components/user-demo"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Monorepo Demo</h1>
          <p className="text-lg text-muted-foreground mb-6">
            This demo shows the integration between the tRPC API server and the Next.js frontend.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="sm">shadcn/ui Button</Button>
            <Button variant="outline" size="sm">Styled with Tailwind</Button>
          </div>
        </div>

        <UserDemo />

        <div className="mt-12 p-6 border rounded-lg bg-muted/50">
          <h2 className="text-xl font-semibold mb-3">How it works:</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>API Server</strong>: tRPC server running on port 3001</li>
            <li>• <strong>Shared Types</strong>: TypeScript types and Zod schemas in `@workspace/types`</li>
            <li>• <strong>API Client</strong>: tRPC React client in `@workspace/api-client`</li>
            <li>• <strong>UI Components</strong>: shadcn/ui components in `@workspace/ui`</li>
            <li>• <strong>Frontend</strong>: Next.js app consuming the API with full type safety</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
