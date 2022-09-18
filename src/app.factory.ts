import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express, { Express, Request, Response } from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import helmet from "helmet";
import cors from "cors";

import { AppDataSource } from "./data-source";

import { articleRouter } from "./routes/articles";
import { DataSource } from "typeorm";
import { errorHandler } from "./utils";

/**
 * do not call synchronous processes in this function, or with side effects (ej: connection to db)
 */
export function createApp(): Express {
  // express instance
  const app = express();

  // config
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.use(helmet());
  app.use(cors());

  // routes
  app.get("/", (req: Request, res: Response) => {
    res.send(process.env.APP_NAME || "ts_express");
  });

  app.use("/articles", articleRouter);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use(errorHandler);

  return app;
}

/**
 * call asynchronous process and do not wait for its result
 */
export function syncCreateApp(): Express {
  AppDataSource.initialize()
    .then(() => {
      console.log("db connected");
    })
    .catch((e) => {
      console.log("db connected failed");
      console.log(e);
    });

  return createApp();
}

/**
 * call asynchronous processes and wait for results
 */
export async function asyncCreateApp(): Promise<{
  app: Express;
  ds: DataSource;
}> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const app = createApp();
  return { app, ds: AppDataSource };
}
