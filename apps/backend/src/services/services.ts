import { prismaClient } from "@repo/db/client";
import dotenv from "dotenv";
const { TwitterApi } = require("twitter-api-v2");
dotenv.config();

export const fetchTweets = async (topic: string) => {
  try {
    const bearer = new TwitterApi(process.env.BEARER_TOKEN);
    const twitterBearer = bearer.readOnly;

    const response = await twitterBearer.v2.search(topic);

    const tweets = response._realData.data || [];
    if (tweets.length === 0) {
      return { success: true, message: "No tweets found", tweets: [] };
    }

    const threeTweets = tweets.slice(0, 3);

    return { success: true, tweets: threeTweets };
  } catch (err) {
    console.error("Error fetching tweets:", err);
    return { success: false, tweets: [] };
  }
};

export const likeTweets = async (id: string, tweets: any[]) => {
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
    const twitterClient = client.readWrite;

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

    return { success: true, likedTweets: likedTweets };
  } catch (err) {
    console.error("Error liking tweets:", err);
    return { success: false, likedTweets: [] };
  }
};
