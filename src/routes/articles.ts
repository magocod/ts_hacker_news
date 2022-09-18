import { Request, Response, NextFunction, Router } from "express";
import { ArticleController } from "../controllers/article.controller";

export const articleRouter = Router();

const articleController = new ArticleController();

/**
 * note: currently an arrow function must be used to call the class instance,
 * do not send the method directly, the reference to the instance will be lost
 *
 * articleRouter.get("/", articleController.method)
 *
 * calling an instance property will return undefined
 */

articleRouter.get("/seed", (req: Request, res: Response, next: NextFunction) => {
  return articleController.seed(req, res).catch(next)
});

articleRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  return articleController.findAll(req, res).catch(next)
});

articleRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  return articleController.create(req, res, next).catch(next)
});

articleRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  return articleController.find(req, res, next).catch(next)
});

articleRouter.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  return articleController.update(req, res, next).catch(next)
});

articleRouter.delete(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    return articleController.delete(req, res).catch(next)
  }
);
