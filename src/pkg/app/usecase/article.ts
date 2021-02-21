import { Article, ArticleRepository } from "../../domain/article";
import {
  ArticleBody,
  ArticleID,
  ArticlePublished,
  ArticleTitle,
} from "../../domain/article-value";

export class ArticleUsecase {
  private readonly repository: ArticleRepository;

  constructor(repository: ArticleRepository) {
    this.repository = repository;
  }

  async saveArticle(input: {
    id: string;
    title: string;
    body: string;
    published: Date;
  }): Promise<void> {
    const id = new ArticleID(input.id);
    const article = new Article(id, {
      title: new ArticleTitle(input.title),
      body: new ArticleBody(input.body),
      published: new ArticlePublished(input.published),
    });
    await this.repository.put(article);
  }

  async removeArticle(input: { id: string }): Promise<void> {
    const id = new ArticleID(input.id);
    await this.repository.remove(id);
  }
}
