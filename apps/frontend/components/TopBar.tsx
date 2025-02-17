"use client";

import { useSession } from "next-auth/react";
import DeveloperToggle from "./Dashboard/DeveloperToggle";
import Logout from "./Dashboard/Logout";
import { Dispatch, SetStateAction } from "react";

export default function ({
  isDevMode,
  setDevMode,
}: {
  isDevMode: boolean;
  setDevMode: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  return (
    <div className="top-0 absolute w-full flex flex-col md:flex-row justify-between items-center">
      <div className="flex justify-center items-center">
        <img
          src={session?.user?.image || undefined}
          className="w-10 h-10 m-2 rounded-full"
        />
        <div className="font-bold">Hi, {session?.user?.name}</div>
      </div>
      <div className="flex justify-between items-center">
        <DeveloperToggle isDevMode={isDevMode} setDevMode={setDevMode} />
        <Logout />
      </div>
    </div>
  );
}
