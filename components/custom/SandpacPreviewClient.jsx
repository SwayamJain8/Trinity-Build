import { ActionContext } from "@/context/ActionContext";
import { BtnLoadingContext } from "@/context/BtnLoadingContext";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useRef } from "react";

const SandpacPreviewClient = () => {
  const previewRef = useRef();
  const { sandpack } = useSandpack();
  const { action, setAction } = useContext(ActionContext);
  const { btnLoading, setBtnLoading } = useContext(BtnLoadingContext);

  useEffect(() => {
    GetSandpackClient();
  }, [sandpack && action]);

  const GetSandpackClient = async () => {
    setBtnLoading(true);

    const client = previewRef.current?.getClient();
    if (client) {
      const result = await client.getCodeSandboxURL();
      if (action?.actionType == "deploy") {
        window.open(
          "http://" + result?.sandboxId + ".csb.app/",
          "_blank",
          "noopener"
        );
      } else if (action?.actionType == "export") {
        window.open(result?.editorUrl);
      }
    }
    setBtnLoading(false);
  };

  return (
    <SandpackPreview
      ref={previewRef}
      style={{ height: "75vh", width: "100%" }}
      showNavigator={true}
      showOpenInCodeSandbox={false}
    />
  );
};

export default SandpacPreviewClient;
