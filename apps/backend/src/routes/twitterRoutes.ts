import express, { Request, Response, Router } from "express";
import { fetchAndLikeTweets } from "../services/services";
import { apiData } from "../services/exampleData";

const twitterRouter: Router = express.Router();

twitterRouter.post("/tweets", async (req: Request, res: Response) => {
  try {
    const { topic, isDevMode, id } = req.body;

    if (!topic || !id) {
      res.status(411).json({ message: "required fields are missing" });
      return;
    }

    if (isDevMode) {
      res.status(200).json({
        success: true,
        likedTweets: apiData.likedTweets,
      });
      return;
    }

    const response: {
      success: boolean;
      tweets: { success: boolean; tweetId: string }[];
    } = await fetchAndLikeTweets(topic, id);

    if (!response.success) {
      res.status(500).json({
        message: "Failed to fetch & like tweets",
        likedTweets: response.tweets,
      });
      return;
    }

    res.status(200).json({
      success: response.success,
      likedTweets: response.tweets,
    });

    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch & like tweets" });
    return;
  }
});

export default twitterRouter;
