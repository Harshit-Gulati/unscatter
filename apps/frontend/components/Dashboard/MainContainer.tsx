"use client";

import { useState } from "react";
import InputContainer from "./InputContainer";
import TweetContainer from "./Tweets/TweetContainer";
import { TweetType } from "@/utils/types";
import { LOADING } from "@/utils/enums";

export default function ({ isDevMode }: { isDevMode: boolean }) {
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [loading, setLoading] = useState<LOADING>(LOADING.NOT_LOADING);
  return (
    <>
      <InputContainer
        setTweets={setTweets}
        isDevMode={isDevMode}
        setLoading={setLoading}
      />
      <TweetContainer tweets={tweets} loading={loading} />
    </>
  );
}
