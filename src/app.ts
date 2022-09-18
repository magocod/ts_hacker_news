/**
 * app with export default syntax
 */

import { syncCreateApp } from "./app.factory";

const app = syncCreateApp();

export default app;

// error to transpile to js
// remove this in favor of app.export.ts
// module.exports = app;
