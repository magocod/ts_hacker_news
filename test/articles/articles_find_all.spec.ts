import { assert } from "chai";
import supertest from "supertest";
import { addQueryString, basicPagination } from "../helpers";
import { generateArticle } from "../fixtures";
import { PaginationResponseKeys } from "../../src/utils";
import { Article } from "../../src/entity";
import { Repository } from "typeorm";
import { asyncCreateApp } from "../../src/app.factory";
import { faker } from "@faker-js/faker";

const baseRoute = "/articles";

describe("articles_find_all", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;
  let articleRep: Repository<Article>;

  before(async function () {
    const { app, ds } = await asyncCreateApp();
    httpClient = supertest(app);
    articleRep = ds.getRepository(Article);
  });

  it("unfiltered", async function () {
    await generateArticle(articleRep);
    const response = await httpClient.get(baseRoute);

    assert.equal(response.status, 200);
    assert.hasAllKeys(response.body, PaginationResponseKeys);
    assert.notEqual(response.body.data.length, 0);
    assert.notEqual(response.body.total, 0);
  });

  it("filtering, by title", async function () {
    const article = await generateArticle(articleRep);
    const qs = basicPagination();
    qs.title = article.title;

    const response = await httpClient.get(addQueryString(baseRoute, qs));

    assert.equal(response.status, 200);
    assert.hasAllKeys(response.body, PaginationResponseKeys);
    assert.equal(response.body.data.length, 1);
    assert.equal(response.body.total, 1);

    // check if the returned content has matches with the filters
    assert.isTrue(
      response.body.data.every((v: { title: string }) => {
        return v.title.includes(article.title as string);
      })
    );
  });

  it("filtering, by author", async function () {
    const article = await generateArticle(articleRep);
    const qs = basicPagination();
    qs.author = article.author;

    const response = await httpClient.get(addQueryString(baseRoute, qs));

    assert.equal(response.status, 200);
    assert.hasAllKeys(response.body, PaginationResponseKeys);
    assert.equal(response.body.data.length, 1);
    assert.equal(response.body.total, 1);

    // check if the returned content has matches with the filters
    assert.isTrue(
      response.body.data.every((v: { author: string }) => {
        return v.author.includes(article.author as string);
      })
    );
  });

  it("filtering, by tags", async function () {
    const testTags = {
      tags: [faker.datatype.uuid(), faker.datatype.uuid()],
    };
    const articleA = await generateArticle(articleRep, testTags);
    const articleB = await generateArticle(articleRep, testTags);

    const qs = basicPagination();
    qs.tags = testTags.tags;
    const response = await httpClient.get(addQueryString(baseRoute, qs));
    console.log(response.body);
    assert.equal(response.status, 200);
    assert.hasAllKeys(response.body, PaginationResponseKeys);
    assert.equal(response.body.data.length, 2);
    assert.equal(response.body.total, 2);

    // check if the returned content has matches with the filters
    assert.isTrue(
      response.body.data.every((v: { tags: string[] }) => {
        return v.tags.some((t) => {
          return articleA.tags.includes(t) || articleB.tags.includes(t);
        });
      })
    );
  });
});
