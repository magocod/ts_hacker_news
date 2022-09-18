export * from "./pagination";
export * from "./errorhandler";

export function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
