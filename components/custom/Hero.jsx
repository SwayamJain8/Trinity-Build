"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Loader2Icon, Wand2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "sonner";

const Hero = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const [loading, setLoading] = useState(false);
  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    setLoading(true);
    if (userDetail?.token < 10) {
      toast("You don't have enough tokens");
      return;
    }
    const msg = {
      role: "user",
      content: input,
    };
    setMessages(msg);
    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    router.push(`/workspace/${workspaceId}`);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center mt-36 xl:mt-55 gap-2 ml-50">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>

      <div
        className="p-5 border rounded-xl max-w-xl w-full mt-3"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-28 max-h-56 resize-none"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          {userInput && (
            <Button
              variant="ghost"
              className="bg-slate-800 p-5 h-10 w-10 rounded-md cursor-pointer"
              onClick={() => onGenerate(userInput)}
            >
              {loading ? <Loader2Icon className="animate-spin" /> : <Wand2 />}
            </Button>
          )}
        </div>
      </div>
      <div className="flex mt-5 flex-wrap max-w-2xl items-center justify-center gap-3">
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <h2
            key={index}
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
            onClick={() => setUserInput(suggestion)}
          >
            {suggestion}
          </h2>
        ))}
      </div>
      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
};

export default Hero;
