"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { api } from "@/convex/_generated/api";
import { UpdateToken } from "@/convex/users";
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
import { ArrowUpRight, Loader2Icon, Rocket } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { countToken } from "./ChatView";
import { UserDetailContext } from "@/context/UserDetailContext";
import SandpacPreviewClient from "./SandpacPreviewClient";
import { ActionContext } from "@/context/ActionContext";
import { Button } from "../ui/button";
import { BtnLoadingContext } from "@/context/BtnLoadingContext";

const CodeView = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const [loading, setLoading] = useState(false);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const UpdateToken = useMutation(api.users.UpdateToken);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const { action, setAction } = useContext(ActionContext);
  const { btnLoading, setBtnLoading } = useContext(BtnLoadingContext);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setActiveTab("code");
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
    // setActiveTab("preview");
  };

  useEffect(() => {
    setActiveTab("preview");
  }, [action]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role == "user") {
        GenerateAiCode();
      }
    }
    setActiveTab("code");
  }, [messages]);

  const GenerateAiCode = async () => {
    setActiveTab("code");
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });
    // console.log(result.data);
    const aiResp = result.data;
    // console.log(JSON.stringify(aiResp)
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
    setFiles(mergedFiles);
    await UpdateFiles({ workspaceId: id, files: aiResp?.files });
    const token =
      Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
    setUserDetail({ ...userDetail, token: token });
    // Update token in database
    await UpdateToken({
      userId: userDetail?._id,
      token: token,
    });
    setLoading(false);
  };

  const onActionBtn = (action) => {
    setBtnLoading(true);
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  return (
    <div className="relative h-[83vh]">
      <div className="bg-[#181818] w-full p-2.5 border-[0.5px] border-gray-800/50 rounded-t-md shadow-md h-13 flex justify-between">
        <div className="flex items-center border-[0.5px] border-gray-700 shrink-0 bg-black/50 w-[130px] justify-center rounded-full shadow-sm">
          <h2
            className={`text-sm font-medium cursor-pointer  ${
              activeTab === "code"
                ? "text-white bg-slate-700 h-full px-3 py-1 rounded-l-full shadow-md"
                : "text-gray-400 hover:text-white px-3 py-1 rounded-full"
            }`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </h2>
          <h2
            className={`text-sm font-medium cursor-pointer  ${
              activeTab === "preview"
                ? "text-white bg-slate-700 h-full px-3 py-1 rounded-r-full  shadow-md"
                : "text-gray-400 hover:text-white px-3 py-1 rounded-full"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </h2>
        </div>
        {activeTab == "preview" && (
          <div className="flex gap-3 items-center mr-1">
            <Button
              variant="ghost"
              className="border-1 border-slate-800 cursor-pointer"
              onClick={() => onActionBtn("export")}
            >
              {btnLoading && action?.actionType == "export" ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <>
                  <ArrowUpRight /> Export
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              className="bg-slate-800 cursor-pointer text-white"
              onClick={() => onActionBtn("deploy")}
            >
              {btnLoading && action?.actionType == "deploy" ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <>
                  <Rocket /> Deploy
                </>
              )}
            </Button>
          </div>
        )}
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
                showTabs={false}
                showLineNumbers={true}
                showInlineErrors
                wrapContent
                closableTabs
                showRunButton={true}
              />
              {/* <MonacoEditor /> */}
            </>
          )}
          {activeTab === "preview" && <SandpacPreviewClient />}
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
