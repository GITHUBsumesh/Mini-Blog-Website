import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import { errorMiddleware } from "./middlewares/error.js";
export const app = express();

config({
  path: "./data/config.env",
});

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blog", blogRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

// Using Middleware
app.use(errorMiddleware);
