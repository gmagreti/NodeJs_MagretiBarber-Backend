import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";
import uploadConfig from "./config/upload";
import AppError from "./errors/AppError";

import "./database";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(3333, () => {
  console.log("🚀 Server Started on port 3333");
});
