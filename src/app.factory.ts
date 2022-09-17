import "reflect-metadata"
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

import { articleRouter } from "./routes/articles";

/* eslint-disable no-alert,  @typescript-eslint/no-unused-vars */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.setHeader("Content-Type", "application/json");

  res.json({
    message: err.message,
    msg: err.msg,
    // error: err.message,
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
export function syncCreateApp(): Express.Application {
  // new Promise((resolve) => {
  //   resolve("");
  // })
  //   .then(() => {
  //     console.log("example connect db");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  return createApp();
}

/**
 * call asynchronous processes and wait for results
 */
export async function asyncCreateApp(): Promise<Express.Application> {
  // await new Promise((resolve) => {
  //   resolve("example connect db");
  // });
  return createApp();
}
