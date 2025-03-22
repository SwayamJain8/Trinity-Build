import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import WorkspaceHistory from "./WorkspaceHistory";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import SideBarFooter from "./SideBarFooter";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar className="">
      <SidebarHeader className="pt-4 px-5">
        <Link href="/" className="w-full">
          <Button
            variant="ghost"
            className="mt-19 bg-slate-800 cursor-pointer text-white w-full"
          >
            {" "}
            <MessageCircleCode /> Start New Chat{" "}
          </Button>
        </Link>
        <h2 className="font-medium text-lg pt-3 pl-0.5">Your Chats</h2>
      </SidebarHeader>
      <SidebarContent className="pl-4 pr-3 scrollbar-hide">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
