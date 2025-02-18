import express from "express";
import cors from "cors";
import twitterRouter from "./routes/twitterRoutes";
import authRouter from "./routes/authRoutes";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/twitter", twitterRouter);

app.listen(3001);
