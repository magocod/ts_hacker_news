import { assert } from "chai";
import { DataSource, Repository } from "typeorm";
import { hackerNewAxios } from "../src/services";
import { createDataSource } from "../src/data-source";
import { HackerNewService } from "../src/services";
import { Article } from "../src/entity";
import * as uuid from "uuid";
import sinon from "sinon";
import { getNodeJsNews } from "./mocks/hackernews";
import { HackerNewsResponse } from "../src/interfaces/hackernews";

// this function are required until forger generates random data (mocks/hackernews.ts)
function uniqueObjectId() {
  const r = getNodeJsNews();
  r.data.hits = r.data.hits.map((v) => {
    v.objectID = uuid.v4();
    return v;
  });
  return r;
}

async function saveInDb(
  data: HackerNewsResponse,
  articleRep: Repository<Article>,
  deleted = false
) {
  await articleRep.save(
    data.hits.map((hit) => {
      return articleRep.create({
        title: hit.title,
        story_id: hit.story_id,
        objectID: hit.objectID,
        author: hit.author,
        tags: hit._tags,
        created_at: hit.created_at,
        url: hit.url,
        points: hit.points,
        story_text: hit.story_text,
        comment_text: hit.comment_text,
        num_comments: hit.num_comments,
        story_title: hit.story_title,
        story_url: hit.story_url,
        parent_id: hit.parent_id,
        deletedAt: deleted ? new Date() : undefined,
      });
    })
  );
}

describe("hacker_new_service", function () {
  let service: HackerNewService;
  let ds: DataSource;
  let articleRep: Repository<Article>;

  before(async function () {
    ds = createDataSource();
    await ds.initialize();
    articleRep = ds.getRepository(Article);
    service = new HackerNewService(articleRep);
  });

  after(async function () {
    await ds.destroy();
  });

  describe("import latest nodejs news", async function () {
    it("save if they don't exist in db", async function () {
      const mock = sinon.stub(hackerNewAxios, "get").resolves(uniqueObjectId());

      // FIXME test assertion - not valid in parallel
      const startCount = await articleRep.count();
      const rs = await service.getNodeJsNews();
      const endCount = await articleRep.count();
      mock.restore();

      assert.equal(rs.saved, 3);
      assert.equal(rs.omitted, 0);
      assert.equal(endCount, startCount + 3);
    });

    it("do not save article if it exists in db", async function () {
      const r = uniqueObjectId();
      await saveInDb(r.data, articleRep);

      const mock = sinon.stub(hackerNewAxios, "get").resolves(r);
      // FIXME test assertion - not valid in parallel
      const startCount = await articleRep.count();
      const rs = await service.getNodeJsNews();
      const endCount = await articleRep.count();
      mock.restore();

      assert.equal(rs.saved, 0);
      assert.equal(rs.omitted, 3);
      assert.equal(endCount, startCount);
    });

    it("don't save item if it exists in db and is marked as deleted", async function () {
      const r = uniqueObjectId();
      await saveInDb(r.data, articleRep, true);

      const mock = sinon.stub(hackerNewAxios, "get").resolves(r);
      // FIXME test assertion - not valid in parallel
      const startCount = await articleRep.count();
      const rs = await service.getNodeJsNews();
      const endCount = await articleRep.count();
      mock.restore();

      assert.equal(rs.saved, 0);
      assert.equal(rs.omitted, 3);
      assert.equal(endCount, startCount);
    });
  });
});
