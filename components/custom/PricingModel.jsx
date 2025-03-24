import Lookup from "@/data/Lookup";
import { IndianRupeeIcon } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const PricingModel = () => {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [selectedOption, setSelectedOption] = useState();
  const UpdateToken = useMutation(api.users.UpdateToken);

  const onPaymentSuccess = async () => {
    const token = userDetail?.token + Number(selectedOption?.value);
    // console.log(token);
    await UpdateToken({
      token: token,
      userId: userDetail?._id,
    });
  };

  return (
    <div className="mt-7 mr-10 grid grid-cols-4 gap-5">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div
          key={index}
          className="border p-7 pb-5 rounded-xl flex flex-col gap-3 "
        >
          <h2 className="font-bold text-2xl">{pricing.name}</h2>
          <h2 className="font-medium text-lg">{pricing.tokens} Tokens</h2>
          <p className="text-gray-400">{pricing.desc}</p>

          <h2 className="font-bold text-4xl text-center mt-6">
            ${pricing.price}
          </h2>
          {pricing.price != 0 ? (
            <PayPalButtons
              disabled={!userDetail}
              style={{ layout: "horizontal" }}
              onClick={() => {
                setSelectedOption(pricing);
                // console.log(pricing.value);
              }}
              onApprove={() => onPaymentSuccess()}
              onCancel={() => console.log("Payment cancelled")}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: pricing.price,
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          ) : (
            <Button
              className="bg-slate-800 text-white text-md mt-3 cursor-pointer"
              variant={"ghost"}
              onClick={() => router.push("/")}
            >
              {" "}
              Get Started For Free
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PricingModel;
