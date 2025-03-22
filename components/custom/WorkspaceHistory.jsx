"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

const WorkspaceHistory = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState([]);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id,
    });
    setWorkspaceList(result);
    // console.log(result);
  };

  return (
    <div className="flex flex-col justify-items-start ">
      {workspaceList &&
        workspaceList.map((workspace, idx) => (
          <Link href={`/workspace/${workspace._id}`} key={idx}>
            <h2
              onClick={toggleSidebar}
              className="text-sm text-gray-500 mb-2 font-semibold hover:text-white cursor-pointer"
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
