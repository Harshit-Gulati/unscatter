"use client";

import { STATIC_STRINGS } from "@/utils/Constants";
import { signOut } from "next-auth/react";

export default function () {
  return (
    <button
      className="mx-3 my-2 inline-flex items-center px-4 py-2 text-white transition-all bg-black rounded-lg hover:bg-gray-800"
      onClick={async () => {
        await signOut({
          callbackUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
        });
      }}
    >
      {STATIC_STRINGS.LOGOUT}
    </button>
  );
}
