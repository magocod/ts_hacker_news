import axios from "axios";

import { HackerNewsResponse } from "../interfaces/hackernews";
import { Article } from "../entity";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

// FIXME axios - move to adapter
export const hackerNewAxios = axios.create({
  baseURL: "https://hn.algolia.com/api/v1",
});

// note: for simplicity non-generic import method

export class HackerNewService {
  private readonly articleRepository: Repository<Article>;

  constructor(articleRepository: Repository<Article>) {
    this.articleRepository = articleRepository;
  }

  /**
   * returns number of articles saved in db
   */
  async getNodeJsNews() {
    const response = await hackerNewAxios.get<HackerNewsResponse>(
      "/search_by_date?query=nodejs"
    );

    let articles: Article[] = [];

    // FIXME optimize connections to db
    for (const hit of response.data.hits) {
      const countExists = await this.articleRepository.count({
        where: { objectID: hit.objectID },
        withDeleted: true,
      });
      if (countExists === 0) {
        // FIXME sanitize data
        articles.push(
          this.articleRepository.create({
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
            parent_id: hit.parent_id
          })
        );
      }
    }

    if (articles.length > 0) {
      articles = await this.articleRepository.save(articles);
    }

    return {
      saved: articles.length,
      omitted: response.data.hits.length - articles.length,
    };
  }
}

export const hackerNewService = new HackerNewService(
  AppDataSource.getRepository(Article)
);
