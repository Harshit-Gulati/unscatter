"use client";
import { STATIC_STRINGS } from "@/utils/Constants";
import { ArrowRight } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export default function () {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);
    signIn("twitter");
  };
  return (
    <div className="flex items-center justify-center gap-4 animate-fade-up">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="inline-flex items-center px-6 py-3 text-white transition-all bg-black rounded-lg hover:bg-gray-800 w-40 justify-center"
        onClick={handleLogin}
      >
        {loading ? (
          "Loading..."
        ) : (
          <>
            {STATIC_STRINGS.GET_STARTED}
            <ArrowRight
              className={`ml-2 transition-transform ${isHovered ? "translate-x-1" : ""}`}
              size={20}
            />
          </>
        )}
      </button>
    </div>
  );
}
