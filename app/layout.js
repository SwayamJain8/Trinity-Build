import "./globals.css";
import { Provider } from "@/app/provider";
import Header from "@/components/custom/Header";
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
          <Provider>
            <Header />
            {children}
          </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
