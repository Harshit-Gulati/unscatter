import express, { Request, Response, Router } from "express";
import { fetchTweets, likeTweets } from "../services/services";
import { apiData } from "../services/exampleData";

const twitterRouter: Router = express.Router();

twitterRouter.post("/fetch-tweets", async (req: Request, res: Response) => {
  try {
    const { topic, isDevMode } = req.body;

    if (!topic) {
      res.status(411).json({ message: "topic is missing" });
      return;
    }

    if (isDevMode) {
      res.status(200).json({
        success: true,
        tweets: apiData.tweets,
      });
      return;
    }

    const response = await fetchTweets(topic);

    if (!response.success) {
      res.status(500).json({
        message: "Failed to fetch tweets",
        tweets: response.tweets,
      });
      return;
    }

    res.status(200).json({
      success: response.success,
      tweets: response.tweets,
    });

    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tweets" });
    return;
  }
});

twitterRouter.post("/like-tweets", async (req: Request, res: Response) => {
  try {
    const { isDevMode, id, tweets } = req.body;

    if (!tweets?.length || !id) {
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

    const response = await likeTweets(id, tweets);

    if (!response.success) {
      res.status(500).json({
        message: "Failed to like tweets",
        likedTweets: response.likedTweets,
      });
      return;
    }

    res.status(200).json({
      success: response.success,
      likedTweets: response.likedTweets,
    });

    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to like tweets" });
    return;
  }
});

export default twitterRouter;
