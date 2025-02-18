import { prismaClient } from "@repo/db/client";
import express, { Request, Response, Router } from "express";

const authRouter: Router = express.Router();

authRouter.post("/", async (req: Request, res: Response) => {
  const { user, account } = req.body;
  try {
    const existingUser = await prismaClient.user.findUnique({
      where: { id: user.id },
    });

    if (existingUser) {
      await prismaClient.user.update({
        where: { id: user.id },
        data: {
          refreshToken: account.oauth_token as string,
          accessToken: account.oauth_token_secret as string,
        },
      });
    } else {
      await prismaClient.user.create({
        data: {
          id: user.id,
          refreshToken: account.oauth_token as string,
          accessToken: account.oauth_token_secret as string,
        },
      });
    }
    res.status(200).json({ message: "Signed In successfully." });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to signin" });
    return;
  }
});

export default authRouter;
