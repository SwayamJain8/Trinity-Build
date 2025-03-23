"use client";
import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";
import React from "react";

const Workspace = () => {
  return (
    <div className="mt-[80px] h-[80vh] p-3 w-full">
      <div className="w-full grid grid-cols-[30%_70%] gap-3">
        <div className="h-full">
          <ChatView />
        </div>
        <div className="h-full pr-3">
          <CodeView />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
