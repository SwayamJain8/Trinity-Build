"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import {
  ArrowRight,
  Link,
  Loader,
  Loader2Icon,
  Wand2,
  WandSparkles,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const UpdateToken = useMutation(api.users.UpdateToken);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role == "user") {
        GetAiResponse();
      }
    }
  }, [messages, userInput]);

  const GetAiResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });
    setMessages([
      ...messages,
      {
        role: "ai",
        content: result.data.result,
      },
    ]);

    await UpdateMessages({
      workspaceId: id,
      messages: [
        ...messages,
        {
          role: "ai",
          content: result.data.result,
        },
      ],
    });

    let token =
      Number(userDetail?.token) - Number(countToken(result.data.result));
    if (token < 0) {
      token = 0;
    }
    setUserDetail({ ...userDetail, token: token });

    // Update token in database
    await UpdateToken({
      userId: userDetail?._id,
      token: token,
    });

    setLoading(false);
  };

  const onGenerate = (input) => {
    if (userDetail?.token < 10) {
      toast("You don't have enough tokens");
      return;
    }
    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  return (
    <div className="relative h-[83vh] flex flex-col w-full">
      {" "}
      {/* Height modified - 85 */}
      <div className="flex-1 overflow-y-scroll scrollbar-hide ml-[2px]">
        {messages?.length > 0 &&
          messages?.map((msg, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg mb-2 flex gap-2 items-center leading-7"
              style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
            >
              {msg.role == "user" && (
                <Image
                  src={userDetail?.picture}
                  alt="userImage"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
              <div className="flex flex-col">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-center"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating Response...</h2>
          </div>
        )}
      </div>
      <div className="flex">
        <div
          className="p-5 border rounded-xl max-w-xl w-full mt-3 ml-[2px]"
          style={{ backgroundColor: Colors.BACKGROUND }}
        >
          <div className="flex gap-2">
            <textarea
              placeholder={Lookup.INPUT_PLACEHOLDER}
              className="outline-none bg-transparent w-full h-22 max-h-56 resize-none"
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
            />
            {userInput && (
              <Button
                variant="ghost"
                className="bg-slate-800 p-5 h-10 w-10 rounded-md cursor-pointer"
                onClick={() => onGenerate(userInput)}
              >
                <Wand2 />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
