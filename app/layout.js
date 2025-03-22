import "./globals.css";
import { Provider } from "@/app/provider";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata = {
  title: "Trinity Build – AI-Powered Website Creation",
  description:
    "Effortlessly create stunning, AI-generated websites with Trinity Build. Experience the future of web design with intelligent automation and seamless customization.",
  icons: {
    icon: "/logo.ico",
  },
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
