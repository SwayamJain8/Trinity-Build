"use client";
import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";
import React from "react";

const Workspace = () => {
  return (
    <div className="p-3 pr-5 mt-[80px] h-[80vh]">
      <div className="w-full gap-5 flex items-center justify-center">
        <ChatView />
        <CodeView className="w-full" />
      </div>
    </div>
  );
};

export default Workspace;
