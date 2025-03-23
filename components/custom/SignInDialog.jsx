import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { useMutation } from "convex/react";
import uuid4 from "uuid4";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";

const SignInDialog = ({ openDialog, closeDialog }) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = React.useState(false);
  const CreateUser = useMutation(api.users.CreateUser);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      // console.log(tokenResponse);
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
      setUserDetail(user);
      setLoading(false);
      // Save this inside our database
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl text-center text-white">
            {Lookup.SIGNIN_HEADING}
          </DialogTitle>
          <DialogDescription>
            <span className="flex flex-col items-center justify-center gap-3">
              <span className="mt-2 text-center">
                {Lookup.SIGNIN_SUBHEADING}
              </span>
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <Button
                  className="bg-slate-900 text-white hover:bg-slate-800 mt-3 cursor-pointer"
                  onClick={googleLogin}
                >
                  Sign In with Google
                </Button>
              )}
              <span>{Lookup.SIGNIn_AGREEMENT_TEXT}</span>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
