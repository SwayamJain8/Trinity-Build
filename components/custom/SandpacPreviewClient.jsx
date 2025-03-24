import { ActionContext } from "@/context/ActionContext";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useRef } from "react";

const SandpacPreviewClient = () => {
  const previewRef = useRef();
  const { sandpack } = useSandpack();
  const { action, setAction } = useContext(ActionContext);

  useEffect(() => {
    GetSandpackClient();
  }, [sandpack && action]);

  const GetSandpackClient = async () => {
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
