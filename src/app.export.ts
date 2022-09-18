/**
 * current error in transpiling to ts, when calling application code from bin directory
 * current solution, use another file with export syntax (export = a)
 */

import { syncCreateApp } from "./app.factory";
import { startScheduleTasks } from "./schedule";

const ACTIVE_SCHEDULE_TASKS = JSON.parse(
  process.env.ACTIVE_SCHEDULE_TASKS as string
);

const app = syncCreateApp();

// boot services
if (ACTIVE_SCHEDULE_TASKS) {
  console.log("starting scheduled tasks");
  startScheduleTasks();
} else {
  console.log("scheduled tasks, disabled");
}

export = app;
