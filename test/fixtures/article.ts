import { Article } from "../../src/entity";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";

export async function generateArticle(
  rep: Repository<Article>,
  data?: Partial<Article>
) {
  let article = rep.create({
    title: faker.datatype.uuid(),
    author: faker.datatype.uuid(),
    tags: [faker.datatype.uuid()],
    objectID: faker.datatype.uuid(),
    ...data,
  });

  article = await rep.save(article);

  return article;
}
