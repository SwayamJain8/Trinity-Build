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
import { History, MessageCircleCode } from "lucide-react";
import SideBarFooter from "./SideBarFooter";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar className="mt-23 h-[83vh]">
      <SidebarHeader className="pt-4 px-5 rounded-md">
        <Link href="/" className="w-full">
          <Button
            variant="ghost"
            className=" bg-slate-800 cursor-pointer text-white w-full"
          >
            {" "}
            <MessageCircleCode /> Start New Chat{" "}
          </Button>
        </Link>
        <div className="flex items-center gap-2 mt-2 pt-4 pl-0.5 border-t-2">
          <History className="w-5 h-5" />
          <h2 className="font-medium text-md "> Chat History</h2>
        </div>
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
