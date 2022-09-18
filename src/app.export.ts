/**
 * current error in transpiling to ts, when calling application code from bin directory
 * current solution, use another file with export syntax (export = a)
 */

import { syncCreateApp } from "./app.factory";

// boot services
// ...

const app = syncCreateApp();

export = app;
