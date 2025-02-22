import { STATIC_STRINGS } from "@/utils/Constants";
import { TweetType } from "@/utils/types";
import { Tweet } from "react-tweet";

export default function RenderTweets({ tweets }: { tweets: TweetType[] }) {
  return (
    <>
      <div className="font-semibold text-xl">
        {STATIC_STRINGS.FETCHED_TWEETS}
      </div>
      <div className="flex gap-1 flex-col md:flex-row max-h-fit">
        {tweets.map((tweet, index) => (
          <div key={index}>
            <Tweet id={tweet.tweetId} />
          </div>
        ))}
      </div>
    </>
  );
}
