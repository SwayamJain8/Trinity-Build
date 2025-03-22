import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const SideBarFooter = () => {
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
    },
    {
      name: "Sign Out",
      icon: LogOut,
    },
  ];

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          variant="ghost"
          key={index}
          className="w-full flex justify-start my-3"
        >
          <option.icon className="w-5 h-5" />
          <span className="text-sm">{option.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
