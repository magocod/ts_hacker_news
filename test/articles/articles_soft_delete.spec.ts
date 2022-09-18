import { assert } from "chai";
import supertest from "supertest";
import { generateArticle } from "../fixtures";
import { PaginationResponseKeys } from "../../src/utils";
import { Article } from "../../src/entity";
import { Repository } from "typeorm";
import { asyncCreateApp } from "../../src/app.factory";

const baseRoute = "/articles";

describe("articles_find_all", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;
  let articleRep: Repository<Article>;

  before(async function () {
    const { app, ds } = await asyncCreateApp();
    httpClient = supertest(app);
    articleRep = ds.getRepository(Article);
  });

  it("not found", async function () {
    const response = await httpClient.delete(`${baseRoute}/${-1}`);
    console.log(response.body);
    assert.equal(response.status, 200);
  });
});
