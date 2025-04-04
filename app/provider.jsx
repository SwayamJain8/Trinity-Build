"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import Header from "@/components/custom/Header";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ActionContext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";
import { BtnLoadingContext } from "@/context/BtnLoadingContext";
import MobileBlocker from "@/components/MobileBlocker";

export function Provider({ children, ...props }) {
  const [messages, setMessages] = React.useState();
  const [userDetail, setUserDetail] = React.useState();
  const [action, setAction] = React.useState();
  const [btnLoading, setBtnLoading] = React.useState(false);
  const convex = useConvex();
  const router = useRouter();

  React.useEffect(() => {
    IsAuthenticated();
  }, [userDetail]);

  const IsAuthenticated = async () => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const result = await convex.query(api.users.GetUser, {
          email: user?.email,
        });
        setUserDetail(result);
      } else {
        router.push("/");
        return;
      }
    }
  };

  return (
    <>
      {/* <MobileBlocker /> */}
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
      >
        <PayPalScriptProvider
          options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
        >
          <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <MessagesContext.Provider value={{ messages, setMessages }}>
              <ActionContext.Provider value={{ action, setAction }}>
                <BtnLoadingContext.Provider
                  value={{ btnLoading, setBtnLoading }}
                >
                  <NextThemesProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
                    <Header />
                    <SidebarProvider defaultOpen={true}>
                      <AppSidebar />
                      {children}
                    </SidebarProvider>
                  </NextThemesProvider>
                </BtnLoadingContext.Provider>
              </ActionContext.Provider>
            </MessagesContext.Provider>
          </UserDetailContext.Provider>
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </>
  );
}
