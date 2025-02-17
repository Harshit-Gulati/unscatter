"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import axios from "axios";
import { STATIC_STRINGS } from "@/utils/Constants";
import { TweetType } from "@/utils/types";
import { useSession } from "next-auth/react";

export default function ({
  setTweets,
  isDevMode,
}: {
  setTweets: Dispatch<SetStateAction<TweetType[]>>;
  isDevMode: boolean;
}) {
  const { data: session } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    const topic = inputRef.current?.value.trim();

    if (!topic) {
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/twitter/tweets`,
        {
          topic,
          isDevMode,
          //@ts-ignore
          id: session?.user?.id,
        }
      );
      setTweets(res.data.likedTweets);
    } catch (error) {
      setError(STATIC_STRINGS.ERROR);
      console.error("Error fetching tweets", error);
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center h-2/5 py-20">
      {error && <div className="p-2 font-semibold text-red-600">{error}</div>}
      <div className="flex flex-col md:flex-row items-center">
        <input
          placeholder="Enter  a topic to search tweets..."
          className="px-4 py-2 rounded-md w-80 font-semibold placeholder:font-medium border-2 border-gray-500"
          ref={inputRef}
        />
        <button
          className="m-2 inline-flex items-center px-4 py-2 text-white transition-all w-24 justify-center bg-black rounded-lg hover:bg-gray-800"
          onClick={handleSearch}
        >
          {STATIC_STRINGS.SEARCH}
        </button>
      </div>
      <div className="p-2 font-semibold">{STATIC_STRINGS.NOTE}</div>
    </div>
  );
}
