import { Article, ArticleRepository } from "../model/article";
import {
  ArticleBody,
  ArticleCreatedTime,
  ArticleID,
  ArticleOpenTime,
  ArticleTitle,
} from "../model/article-value";

type ArticleData = {
  id: string;
  title?: string;
  body?: string;
  openTime?: Date;
  created?: Date;
};

export class ArticleUsecase {
  private readonly repository: ArticleRepository;

  constructor(repository: ArticleRepository) {
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

  async getArticle(input: { id: string }): Promise<{ article: ArticleData }> {
    const id = new ArticleID(input.id);
    const article = await this.repository.get(id);
    return {
      article: createArticleData(article),
    };
  }

  async removeArticle(input: { id: string }): Promise<void> {
    const id = new ArticleID(input.id);
    await this.repository.remove(id);
  }
}

function createArticleData(article: Article): ArticleData {
  return {
    id: article.id.value,
    title: article.title?.value,
    body: article.body?.value,
    openTime: article.openTime?.value,
    created: article.created.value,
  };
}
