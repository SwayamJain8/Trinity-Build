import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "@/context/UserDetailContext";
import { MessagesContext } from "@/context/MessagesContext";

const SideBarFooter = () => {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);

  const options = [
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "Help Center",
      icon: HelpCircle,
    },
    {
      name: "My Subscription",
      icon: Wallet,
      path: "/pricing",
    },
    {
      name: "Sign Out",
      icon: LogOut,
    },
  ];

  const optionClick = (option) => {
    if (option.name == "Sign Out") {
      localStorage.removeItem("user");
      setUserDetail(null);
      setMessages([]);
      router.replace("/", { scroll: false });
      router.refresh();
      return;
    }

    router.push(option.path);
  };

  return (
    <div className="p-2 mb-2">
      {options.map((option, index) => (
        <Button
          variant="ghost"
          key={index}
          className="w-full flex justify-start my-2"
          onClick={() => optionClick(option)}
        >
          <option.icon className="w-5 h-5" />
          <span className="text-sm">{option.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
