import { TweetType } from "@/utils/types";
import RenderEmpty from "./partials/renderEmpty";
import RenderTweets from "./partials/renderTweets";

export default function ({ tweets }: { tweets: TweetType[] }) {
  return (
    <div className="w-[90%] min-h-4/5 flex flex-col justify-start">
      {tweets.length ? <RenderTweets tweets={tweets} /> : <RenderEmpty />}
    </div>
  );
}
