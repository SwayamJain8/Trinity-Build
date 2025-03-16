import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";

const Header = () => {
  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={"/logo.png"} alt="logo" width={40} height={40} />
      <div className="flex gap-5">
        <Button variant={"ghost"} className="cursor-pointer">
          Sign In
        </Button>
        <Button
          className="text-white cursor-pointer"
          style={{ backgroundColor: Colors.BLUE }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Header;
