import cron from "node-cron";
import { hackerNewService } from "./services";
import { AppDataSource } from "./data-source";

export function startScheduleTasks() {
  cron.schedule("0 * * * *", async () => {
    try {
      // required, no guarantee of having a connection to bd
      if (!AppDataSource.isInitialized) {
        return;
      }
      const rs = await hackerNewService.getNodeJsNews();
      console.log("getNodeJsNews", rs);
    } catch (e) {
      if (e instanceof Error) {
        console.log("error-getNodeJsNews", e.message, e.name);
      }
    }
  });
}
