"use client"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps, useTheme } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// eslint-disable-next-line react-refresh/only-export-components
export { useTheme }
