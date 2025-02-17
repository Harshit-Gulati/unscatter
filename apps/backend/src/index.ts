import express from "express";
import cors from "cors";
import twitterRouter from "./twitterRoutes";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/twitter", twitterRouter);

app.listen(3001);
