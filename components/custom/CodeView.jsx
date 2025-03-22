"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { api } from "@/convex/_generated/api";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import MonacoEditor from "./MonacoEditor";

const CodeView = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const [loading, setLoading] = useState(false);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const convex = useConvex();

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role == "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });
    // console.log(result.data);
    const aiResp = result.data;
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
    setFiles(mergedFiles);
    await UpdateFiles({ workspaceId: id, files: aiResp?.files });
    setLoading(false);
  };

  return (
    <div className="relative w-[80%]">
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 justify-center rounded-full">
          <h2
            className={`text-sm cursor-pointer ${activeTab === "code" && "text-blue-500 bg-blue-500/25 p-1 px-2 rounded-full "} `}
            onClick={() => setActiveTab("code")}
          >
            Code
          </h2>
          <h2
            className={`text-sm cursor-pointer ${activeTab === "preview" && "text-blue-500 bg-blue-500/25 p-1 px-2 rounded-full "} `}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </h2>
        </div>
      </div>

      <SandpackProvider
        template="react"
        theme={"dark"}
        files={files}
        customSetup={{ dependencies: { ...Lookup.DEPENDANCY } }}
        options={{
          externalResources: [
            "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          ],
          resizablePanels: true,
        }}
        style={{
          height: "75vh",
          width: "100%",
        }}
      >
        <SandpackLayout>
          {activeTab === "code" && (
            <>
              <SandpackFileExplorer style={{ height: "75vh" }} />
              <SandpackCodeEditor
                style={{ height: "75vh" }}
                showTabs
                showLineNumbers={true}
                showInlineErrors
                wrapContent
                closableTabs
              />
              {/* <MonacoEditor /> */}
            </>
          )}
          {activeTab === "preview" && (
            <div className="w-[100%]">
              <SandpackPreview
                style={{ height: "75vh", width: "100%" }}
                showNavigator={true}
              />
            </div>
          )}
        </SandpackLayout>
      </SandpackProvider>

      {loading && (
        <div className="p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center gap-2">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2>Generating your files...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
