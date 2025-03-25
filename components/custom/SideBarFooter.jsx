import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { UserDetailContext } from "@/context/UserDetailContext";
import { MessagesContext } from "@/context/MessagesContext";
import SignInDialog from "./SignInDialog";

const SideBarFooter = () => {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);

  const options = [
    // {
    //   name: "Settings",
    //   icon: Settings,
    // },
    // {
    //   name: "Help Center",
    //   icon: HelpCircle,
    // },
    {
      name: "Wallet & Pricing",
      icon: Wallet,
      path: "/pricing",
    },
    {
      name: "Sign Out",
      icon: LogOut,
    },
  ];

  // const optionClick = (option) => {
  //   if (option.name == "Sign Out") {
  //     localStorage.removeItem("user");
  //     setUserDetail(null);
  //     setMessages([]);
  //     router.replace("/", { scroll: false });
  //     router.refresh();
  //     return;
  //   }

  //   router.push(option.path);
  // };
  const path = usePathname();
  // const [openDialog, setOpenDialog] = useState(false);

  const show = (option) => {
    // if (!userDetail?.name) {
    //   setOpenDialog(true);
    //   return;
    // }
    // router.push(option.path);
    router.push(option.path);
  };
  return (
    <div className="p-2 px-3 -mb-2">
      {options.map((option, index) =>
        path?.includes("workspace") && option.name == "Sign Out" ? (
          // <Button
          //   variant="ghost"
          //   key={index}
          //   className="w-full flex justify-center my-3 bg-slate-800 cursor-pointer"
          //   onClick={() => optionClick(option)}
          // >
          //   <option.icon className="w-5 h-5" />
          //   <span className="text-md">{option.name}</span>
          // </Button>
          <div key={index}></div>
        ) : (
          option.name == "Wallet & Pricing" && (
            <div key={index}>
              <Button
                variant="ghost"
                key={index}
                className="w-full flex justify-center my-3 bg-slate-800 cursor-pointer "
                onClick={() => show(option)}
              >
                <option.icon className="w-5 h-5" />
                <span className="text-md">{option.name}</span>
              </Button>
              {/* <SignInDialog
                openDialog={openDialog}
                closeDialog={(v) => setOpenDialog(v)}
              /> */}
            </div>
          )
        )
      )}
    </div>
  );
};

export default SideBarFooter;
