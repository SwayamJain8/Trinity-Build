"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={"/logo.png"} alt="logo" width={40} height={40} />
      <div className="flex gap-5">
        {!userDetail?.name && (
          <>
            <Button variant={"ghost"} className="cursor-pointer">
              Sign In
            </Button>
            <Button
              className="text-white cursor-pointer"
              style={{ backgroundColor: Colors.BLUE }}
            >
              Get Started
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
