// import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";
import { Article } from "./entity";

// const entitiesPath =
//   process.env.NODE_ENV === "testing"
//     ? "src/entity/**/*.ts"
//     : "dist/entity/**/*.js";

export function createDataSource(): DataSource {
  return new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    // entities: [entitiesPath],
    entities: [Article],
    migrations: ["dist/migration/**/*.js"],
    subscribers: [],
  });
}

export const AppDataSource = createDataSource();
