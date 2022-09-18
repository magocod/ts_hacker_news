/**
 * note this global hook is required, modules are currently used to handle data source singlets,
 * by changing this aspect it will no longer be required
 */

import { AppDataSource } from "../src/data-source";

export async function mochaGlobalSetup() {
  // console.log("GlobalSetup from ts");
  await AppDataSource.initialize();
}

export async function mochaGlobalTeardown() {
  // console.log("GlobalTeardown from ts");
  await AppDataSource.destroy();
}
