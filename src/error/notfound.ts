import { BaseError } from "./base";

export class UnImplementedError extends BaseError {
  constructor() {
    super("unimplemented", 404, "unimplemented");
    this.name = "UnImplementedError";
  }
}
