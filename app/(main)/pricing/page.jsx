"use client";
import PricingModel from "@/components/custom/PricingModel";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import React, { useContext } from "react";

const page = () => {
  const { userDetail, setuserDetail } = useContext(UserDetailContext);
  return (
    <div className="flex flex-col items-center w-full mt-23">
      {/* <div className=" flex flex-col items-center w-full  md:px-32 lg:px-48">
        <h2 className="font-bold text-4xl mr-50">Pricing</h2>
        <p className="text-gray-400 text-md max-w-xl mr-50 text-center mt-4">
          {Lookup.PRICING_DESC}
        </p>
      </div> */}
      <div className="flex flex-col items-center justify-center w-full h-[85vh] px-10 pb-5">
        {userDetail && (
          <div
            className="p-5 border rounded-xl w-[97%] mr-10 flex justify-between mt-5 items-center  "
            style={{ backgroundColor: Colors.BACKGROUND }}
          >
            <h2 className="text-lg">
              <span className="font-bold">{userDetail?.token} </span>
              tokens left
            </h2>
            <div className="">
              <h2 className="font-medium">Need more token?</h2>
              <p>Upgrade your plan below</p>
            </div>
          </div>
        )}
        <PricingModel />
      </div>
    </div>
  );
};

export default page;
