import { assert } from "chai";
import supertest from "supertest";

import { createApp } from "../src/app.factory";

describe("example_integration", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;

  before(function () {
    const app = createApp();
    httpClient = supertest(app);
  });

  it("base url", async function () {
    const response = await httpClient.get("/");
    assert.equal(response.status, 200);
  });

  it("not found url", async function () {
    const response = await httpClient.get("/not_exist");
    assert.equal(response.status, 404);
    assert.deepEqual(response.body, {
      message: "Not Found",
      msg: "general exception message",
    });
  });
});
