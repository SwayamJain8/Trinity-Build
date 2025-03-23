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
    GetAllWorkspace();
  }, [userDetail, messages]);

  const GetAllWorkspace = async () => {
    if (userDetail) {
      const result = await convex.query(api.workspace.GetAllWorkspace, {
        userId: userDetail._id,
      });
      setWorkspaceList(result);
    } else {
      setWorkspaceList([]);
    }
  };

  const { id } = useParams();
  const [expandedWorkspace, setExpandedWorkspace] = useState(id);

  return (
    <div className="flex flex-col justify-items-start">
      {workspaceList &&
        workspaceList
          .slice()
          .reverse()
          .map((workspace, idx) => {
            const isExpanded = expandedWorkspace === workspace._id;
            const content = workspace?.messages[0]?.content || "";
            const displayText =
              isExpanded || content.length <= 21
                ? content
                : content.slice(0, 21) + "...";

            return (
              <Link href={`/workspace/${workspace._id}`} key={idx}>
                <h2
                  className={`text-[15px] mb-2 font-semibold hover:text-white cursor-pointer ${
                    workspace._id == id
                      ? "text-white border-2 border-slate-700 p-1 rounded-md pl-2"
                      : "text-gray-500"
                  }`}
                  onClick={(e) => {
                    setExpandedWorkspace(isExpanded ? null : workspace._id);
                  }}
                >
                  {displayText}
                </h2>
              </Link>
            );
          })}
    </div>
  );
};

export default WorkspaceHistory;
