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
  html?: string;
  openTime?: Date;
  created?: Date;
};

type CraeteNewArticleInput = {
  id: string;
  title: string;
  html: string;
  openTime: Date;
};

type GetArticleInput = {
  id: string;
};

type GetArticleOutput = {
  article: ArticleData;
};

export class ArticleUsecase {
  private readonly repository: ArticleRepository;

  constructor(repository: ArticleRepository) {
    this.repository = repository;
  }

  async createNewArticle(input: CraeteNewArticleInput): Promise<void> {
    const id = new ArticleID(input.id);
    const created = new ArticleCreatedTime(new Date());
    const article = new Article(id, created);
    article.title = new ArticleTitle(input.title);
    article.body = new ArticleBody(input.html);
    article.openTime = new ArticleOpenTime(input.openTime);
    this.repository.put(article);
  }

  async getArticle(input: GetArticleInput): Promise<GetArticleOutput> {
    const id = new ArticleID(input.id);
    const article = await this.repository.get(id);
    return {
      article: createArticleData(article),
    };
  }
}

function createArticleData(article: Article): ArticleData {
  return {
    id: article.id.value,
    title: article.title?.value,
    html: article.body?.value,
    openTime: article.openTime?.value,
    created: article.created.value,
  };
}
