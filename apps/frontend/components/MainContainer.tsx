"use client";

import { useState } from "react";
import InputContainer from "./Dashboard/InputContainer";
import TweetContainer from "./Dashboard/Tweets/TweetContainer";
import { TweetType } from "@/utils/types";

export default function ({ isDevMode }: { isDevMode: boolean }) {
  const [tweets, setTweets] = useState<TweetType[]>([]);
  return (
    <>
      <InputContainer setTweets={setTweets} isDevMode={isDevMode} />
      <TweetContainer tweets={tweets} />
    </>
  );
}
