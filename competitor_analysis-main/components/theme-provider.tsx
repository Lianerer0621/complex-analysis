// theme-provider.tsx
"use client"

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  // Ensure that the theme provider is only rendered on the client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Return nothing or a fallback until mounted
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
