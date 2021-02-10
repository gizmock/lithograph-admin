import { Article, ArticleWriteRepository } from "../model/article";
import {
  ArticleBody,
  ArticleCreatedTime,
  ArticleID,
  ArticleOpenTime,
  ArticleTitle,
} from "../model/article-value";

export class ArticleUsecase {
  private readonly repository: ArticleWriteRepository;

  constructor(repository: ArticleWriteRepository) {
    this.repository = repository;
  }

  async editArticle(input: {
    id: string;
    title: string;
    html: string;
    openTime: Date;
  }): Promise<void> {
    const id = new ArticleID(input.id);
    const created = new ArticleCreatedTime(new Date());
    const article = new Article(id, created);
    article.title = new ArticleTitle(input.title);
    article.body = new ArticleBody(input.html);
    article.openTime = new ArticleOpenTime(input.openTime);
    await this.repository.put(article);
  }

  async removeArticle(input: { id: string }): Promise<void> {
    const id = new ArticleID(input.id);
    await this.repository.remove(id);
  }
}
