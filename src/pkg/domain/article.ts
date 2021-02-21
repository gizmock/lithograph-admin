import {
  ArticleID,
  ArticleBody,
  ArticlePublished,
  ArticleTitle,
} from "./article-value";

export class Article {
  readonly id: ArticleID;
  title: ArticleTitle;
  body: ArticleBody;
  published: ArticlePublished;

  constructor(
    id: ArticleID,
    values: {
      title: ArticleTitle;
      body: ArticleBody;
      published: ArticlePublished;
    }
  ) {
    this.id = id;
    this.title = values.title;
    this.body = values.body;
    this.published = values.published;
  }
}

export interface ArticleWriteRepository {
  put(article: Article): Promise<void>;
  remove(id: ArticleID): Promise<void>;
}
