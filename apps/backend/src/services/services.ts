import { prismaClient } from "@repo/db/client";
import dotenv from "dotenv";
const { TwitterApi } = require("twitter-api-v2");
dotenv.config();

export const fetchAndLikeTweets = async (topic: string, id: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const client = new TwitterApi({
      appKey: process.env.API_KEY,
      appSecret: process.env.API_SECRET,
      accessToken: user.accessToken,
      accessSecret: user.refreshToken,
    });
    const bearer = new TwitterApi(process.env.BEARER_TOKEN);
    const twitterClient = client.readWrite;
    const twitterBearer = bearer.readOnly;

    const response = await twitterBearer.v2.search(
      `${topic} -is:retweet min_faves:5 lang:en`
    );

    const tweets = response._realData.data || [];
    if (tweets.length === 0) {
      return { success: true, message: "No tweets found", tweets: [] };
    }

    const likedTweets = [];
    for (const tweet of tweets) {
      try {
        await twitterClient.v2.like(process.env.APP_ID, tweet.id);
        likedTweets.push({ success: true, tweetId: tweet.id });
      } catch (likeError) {
        console.error(`Failed to like tweet ${tweet.id}:`, likeError);
        likedTweets.push({ success: false, tweetId: tweet.id });
      }
    }

    return { success: true, tweets: likedTweets };
  } catch (err) {
    console.error("Error fetching and liking tweets:", err);
    return { success: false, tweets: [] };
  }
};
