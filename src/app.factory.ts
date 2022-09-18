import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express, {
  ErrorRequestHandler,
  Express,
  Request,
  Response,
} from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import helmet from "helmet";
import cors from "cors";

import { AppDataSource, createDataSource } from "./data-source";

import { articleRouter } from "./routes/articles";
import { DataSource } from "typeorm";

/**
 * if error does not contain msg, it may be an unknown exception
 * @param err
 * @param req
 * @param res
 * @param next
 */
/* eslint-disable no-alert,  @typescript-eslint/no-unused-vars */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log(req.app.get("env"));
  console.log(err);
  res.status(err.status || 500);
  res.setHeader("Content-Type", "application/json");

  res.json({
    message: req.app.get("env") === "development" ? err.message : undefined,
    msg: err.msg ? err.msg : "general exception message",
  });
};

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
  await AppDataSource.initialize();
  const app = createApp();
  return { app, ds: AppDataSource };
}
