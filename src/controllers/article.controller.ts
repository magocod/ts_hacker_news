import { Request, Response, NextFunction } from "express";
import { HttpController } from "../interfaces";
import { UnImplementedError } from "../error";
import { hackerNewService } from "../services";
import { generatePagination } from "../utils";
import { Article } from "../entity";
import { FindOptionsWhere, ILike, ArrayContains } from "typeorm";
import { AppDataSource } from "../data-source";
import { NotFoundError } from "../error"

export class ArticleController implements HttpController {
  private readonly articleRepository = AppDataSource.getRepository(Article);

  async findAll(req: Request, res: Response) {
    // FIXME sanitize querystring
    const { page = 1, author, tags, title } = req.query;
    const where: FindOptionsWhere<Article> = {};
    const orWhere: FindOptionsWhere<Article>[] = [];

    if (author !== undefined && author !== "") {
      where.author = ILike(`%${author}%`);
    }

    if (title !== undefined && title !== "") {
      where.title = ILike(`%${title}%`);
    }

    if (tags !== undefined && tags !== "" && typeof tags === "string") {
      for (const t of tags.split(",")) {
        orWhere.push({ ...where, tags: ArrayContains([t]) });
      }
    }

    const { pagination, offset } = generatePagination<Article>(page);

    const [articles, total] = await this.articleRepository.findAndCount({
      where: orWhere.length > 0 ? orWhere : where,
      take: pagination.perPage,
      skip: offset,
    });

    pagination.data = articles;
    pagination.total = total;

    return res.status(200).json({ message: "Node.js news", ...pagination });
  }

  async create(_req: Request, _res: Response, _next: NextFunction) {
    throw new UnImplementedError();
  }

  async find(_req: Request, _res: Response, _next: NextFunction) {
    throw new UnImplementedError();
  }

  async update(_req: Request, _res: Response, _next: NextFunction) {
    throw new UnImplementedError();
  }

  async delete(req: Request, res: Response) {
    // FIXME route params - validation
    const article = await this.articleRepository.findOne({
      where: { id: parseInt(req.params.id) },
    });
    if (article === null) {
      throw new NotFoundError()
    }
    // const article = await this.articleRepository.findOneOrFail({
    //   where: { id: parseInt(req.params.id) },
    // });

    const results = await this.articleRepository.softDelete(article.id);
    return res.status(200).json({ message: "removed", data: results });
  }

  async seed(_req: Request, res: Response) {
    const rs = await hackerNewService.getNodeJsNews();
    return res.status(200).json({ message: "node js news uploaded", data: rs });
  }
}
