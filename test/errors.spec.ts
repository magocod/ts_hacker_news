import { assert } from "chai";

import { ExampleError, BaseError } from "../src/error";
import { createApp } from "../src/app.factory";
import supertest from "supertest";

function callBaseError() {
  throw new BaseError("from func", "overwrite message");
}

function callExampleError() {
  throw new ExampleError();
}

describe("errors", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;

  before(function () {
    const app = createApp();
    // app.get("/sync", (_req: Request, res: Response) => {
    //   callExampleError();
    //   res.json({});
    // });
    httpClient = supertest(app);
  });

  describe("base_error", function () {
    it("throw", function () {
      try {
        throw new BaseError("baz", "bazMessage");
      } catch (e) {
        if (e instanceof BaseError) {
          assert.equal(e.message, "bazMessage");
          assert.equal(e.name, "BaseError");
          assert.equal(e.msg, "baz");
        }
      }
    });

    it("from function", function () {
      try {
        callBaseError();
      } catch (e) {
        if (e instanceof BaseError) {
          assert.equal(e.message, "overwrite message");
          assert.equal(e.name, "BaseError");
          assert.equal(e.msg, "from func");
        }
      }
    });
  });

  describe("example_error", function () {
    it("throw", function () {
      try {
        throw new ExampleError();
      } catch (e) {
        if (e instanceof ExampleError) {
          assert.equal(e.message, "example code error message");
          assert.equal(e.name, "ExampleError");
          assert.equal(e.msg, "example message");
        }
      }
    });

    it("from function", function () {
      try {
        callExampleError();
      } catch (e) {
        if (e instanceof ExampleError) {
          assert.equal(e.message, "example code error message");
          assert.equal(e.name, "ExampleError");
          assert.equal(e.msg, "example message");
        }
      }
    });

    it("check with base class", function () {
      try {
        callExampleError();
      } catch (e) {
        if (e instanceof BaseError) {
          assert.equal(e.message, "example code error message");
          assert.equal(e.name, "ExampleError");
          assert.equal(e.msg, "example message");
        }
      }
    });

    // it("with express, sync code", async function () {
    //   const response = await httpClient.get("/sync_error");
    //   // console.log(response.body);
    //   assert.equal(response.status, 500);
    // });
    //
    // it("with express, async code", async function () {
    //   const response = await httpClient.get("/async_error");
    //   // console.log(response.body);
    //   assert.equal(response.status, 500);
    // });
  });
});
