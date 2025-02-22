"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import MainContainer from "./Dashboard/MainContainer";
import { SessionProvider } from "next-auth/react";

export const Dashboard = () => {
  const [isDevMode, setDevMode] = useState<boolean>(false);

  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-wrap flex-col text-black justify-around items-center bg-gradient-to-b from-white to-gray-300">
        <TopBar isDevMode={isDevMode} setDevMode={setDevMode} />
        <MainContainer isDevMode={isDevMode} />
      </div>
    </SessionProvider>
  );
};
