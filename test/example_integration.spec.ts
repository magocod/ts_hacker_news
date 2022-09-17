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
    // console.log(response.body);
    assert.equal(response.status, 200);
  });
});
