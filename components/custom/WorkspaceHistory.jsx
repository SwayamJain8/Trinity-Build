import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { MessagesContext } from "@/context/MessagesContext";
import { useParams } from "next/navigation";

const WorkspaceHistory = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState([]);
  const { messages, setMessages } = useContext(MessagesContext);

  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail, messages]);

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id,
    });
    setWorkspaceList(result);
  };

  const { id } = useParams();

  return (
    <div className="flex flex-col justify-items-start">
      {workspaceList &&
        workspaceList
          .slice()
          .reverse()
          .map((workspace, idx) => (
            <Link href={`/workspace/${workspace._id}`} key={idx}>
              <h2
                className={`text-[15px]  mb-2 font-semibold hover:text-white cursor-pointer ${workspace._id == id ? "text-white bg-slate-800 p-1 rounded-md pl-2" : "text-gray-500"}`}
              >
                {workspace?.messages[0]?.content.length > 27
                  ? workspace?.messages[0]?.content.slice(0, 27) + "..."
                  : workspace?.messages[0]?.content}
              </h2>
            </Link>
          ))}
    </div>
  );
};

export default WorkspaceHistory;
