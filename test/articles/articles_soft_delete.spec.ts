import { assert } from "chai";
import supertest from "supertest";
import { Article } from "../../src/entity";
import { Repository } from "typeorm";
import { asyncCreateApp } from "../../src/app.factory";
import { generateArticle } from "../fixtures";

const baseRoute = "/articles";

describe("articles_soft_delete", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;
  let articleRep: Repository<Article>;

  before(async function () {
    const { app, ds } = await asyncCreateApp();
    httpClient = supertest(app);
    articleRep = ds.getRepository(Article);
  });

  it("not found", async function () {
    const response = await httpClient.delete(`${baseRoute}/${-1}`);

    assert.equal(response.status, 404);
    assert.deepEqual(response.body, {
      message: "not found error",
      msg: "not found error",
    });
  });

  it("successfully removed", async function () {
    const article = await generateArticle(articleRep);

    const response = await httpClient.delete(`${baseRoute}/${article.id}`);
    const articleRemoved = await articleRep.findOne({
      where: { id: article.id },
    });

    assert.equal(response.status, 200);
    assert.equal(response.body.message, "removed");
    assert.isNull(articleRemoved);
  });

  it("article is removed", async function () {
    const article = await generateArticle(articleRep, {
      deletedAt: new Date(),
    });

    const response = await httpClient.delete(`${baseRoute}/${article.id}`);

    assert.equal(response.status, 404);
    assert.deepEqual(response.body, {
      message: "not found error",
      msg: "not found error",
    });
  });

  // it("invalid url parameter", async function () {
  //   const response = await httpClient.delete(`${baseRoute}/hello_world`);
  //   assert.equal(response.status, 404);
  // });
});
