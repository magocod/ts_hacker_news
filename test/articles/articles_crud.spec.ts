import { assert } from "chai";
import supertest from "supertest";
import { asyncCreateApp } from "../../src/app.factory";

const baseRoute = "/articles";

describe("articles_crud", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;

  before(async function () {
    const { app } = await asyncCreateApp();
    httpClient = supertest(app);
  });

  it("find one", async function () {
    const response = await httpClient.get(`${baseRoute}/1`);

    assert.equal(response.status, 400);
    assert.deepEqual(response.body, {
      message: "unimplemented",
      msg: "unimplemented",
    });
  });

  it("create", async function () {
    const response = await httpClient.post(`${baseRoute}`).send({});

    assert.equal(response.status, 400);
    assert.deepEqual(response.body, {
      message: "unimplemented",
      msg: "unimplemented",
    });
  });

  it("update", async function () {
    const response = await httpClient.put(`${baseRoute}/1`).send({});

    assert.equal(response.status, 400);
    assert.deepEqual(response.body, {
      message: "unimplemented",
      msg: "unimplemented",
    });
  });
});
