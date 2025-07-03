"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { TRPCProvider } from "@workspace/api-client"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider apiUrl="http://localhost:3001/trpc">
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </TRPCProvider>
  )
}
