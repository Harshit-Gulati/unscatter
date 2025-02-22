import { TweetType } from "@/utils/types";
import RenderEmpty from "./partials/renderEmpty";
import RenderTweets from "./partials/renderTweets";
import RenderLoading from "./partials/renderLoading";
import { STATIC_STRINGS } from "@/utils/Constants";
import { LOADING } from "@/utils/enums";

export default function ({
  tweets,
  loading,
}: {
  tweets: TweetType[];
  loading: string;
}) {
  return (
    <div className="w-[95%] min-h-[50vh] flex flex-col justify-start">
      {loading === LOADING.NOT_LOADING &&
        (tweets.length ? <RenderTweets tweets={tweets} /> : <RenderEmpty />)}
      {loading && (
        <RenderLoading
          label={
            loading === LOADING.FETCH
              ? STATIC_STRINGS.FETCHING_TWEETS
              : STATIC_STRINGS.LIKING_TWEETS
          }
        />
      )}
    </div>
  );
}
