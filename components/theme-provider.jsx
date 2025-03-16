"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MessagesContext } from "@/context/MessagesContext";

export function ThemeProvider({ children, ...props }) {
  const [messages, setMessages] = React.useState();

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </MessagesContext.Provider>
  );
}
