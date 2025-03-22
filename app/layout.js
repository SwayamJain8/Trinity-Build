import "./globals.css";
import { Provider } from "@/app/provider";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata = {
  title: "Trinity",
  description: "Trinity Website Builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body cz-shortcut-listen="true">
        <ConvexClientProvider>
          <Provider>{children}</Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
