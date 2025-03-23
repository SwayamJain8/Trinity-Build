import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { LogIn, LogOut, LucideDownload, Rocket } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import { usePathname, useRouter } from "next/navigation";
import { MessagesContext } from "@/context/MessagesContext";
import { ActionContext } from "@/context/ActionContext";

const Header = () => {
  const router = useRouter();
  const [showName, setShowName] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const { action, setAction } = useContext(ActionContext);
  const CreateUser = useMutation(api.users.CreateUser);
  const path = usePathname();

  const onActionBtn = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      // console.log(userInfo);
      const user = userInfo?.data;
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4(),
      });
      if (typeof window !== undefined) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      setUserDetail(userInfo?.data);
      // Save this inside our database
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="py-4 pb-2 pl-5 pr-7 flex justify-between items-center fixed top-0 left-0 right-0 z-50 border-b-2 rounded-b-3xl border-slate-500/50">
      <Image src={"/logo.png"} alt="logo" width="50" height="50" />
      <h1 className="text-3xl font-bold italic text-slate-500 ml-25 tracking-widest py-2 px-5 group transition-colors duration-500 ease-in-out">
        <span className="text-slate-100 group-hover:text-slate-500 transition-colors duration-500 ease-in-out">
          Trinity
        </span>{" "}
        <span className="text-slate-500 group-hover:text-slate-100 transition-colors duration-500 ease-in-out">
          Build
        </span>
      </h1>

      <div className="flex gap-5">
        {!userDetail?.name ? (
          <>
            <Button
              variant={"ghost"}
              className="cursor-pointer text-white bg-slate-800"
              onClick={() => {
                googleLogin();
              }}
            >
              <LogIn />
              Sign In
            </Button>
          </>
        ) : (
          <div className="flex gap-3 items-center justify-center">
            {path?.includes("workspace") ? (
              <div className="flex gap-3 items-center">
                <Button
                  variant="ghost"
                  className="border-1 border-slate-800 cursor-pointer"
                  onClick={() => onActionBtn("export")}
                >
                  <LucideDownload /> Export
                </Button>
                <Button
                  variant="ghost"
                  className="bg-slate-800 cursor-pointer text-white"
                  onClick={() => onActionBtn("deploy")}
                >
                  <Rocket /> Deploy
                </Button>
              </div>
            ) : (
              <Button
                variant={"ghost"}
                className="text-white cursor-pointer bg-slate-800"
                onClick={() => {
                  localStorage.removeItem("user");
                  setUserDetail(null);
                  setMessages([]);
                  router.replace("/", { scroll: false });
                  router.refresh();
                }}
              >
                <LogOut />
                Sign Out
              </Button>
            )}
            {userDetail?.picture && (
              <div
                onMouseEnter={() => setShowName(true)}
                onMouseLeave={() => setShowName(false)}
                className="flex flex-col items-center justify-center"
              >
                {showName && (
                  <div className="absolute mt-18 bg-slate-600/25 text-slate-300 p-1.25 px-3 rounded-full shadow-lg text-xs tracking-wide ">
                    {userDetail?.name}
                  </div>
                )}
                <Image
                  src={userDetail?.picture || ""}
                  alt="profile"
                  width="40"
                  height="40"
                  className="rounded-full border-2 border-slate-700"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
