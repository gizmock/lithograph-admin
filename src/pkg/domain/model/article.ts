import {
  ArticleID,
  ArticleBody,
  ArticleOpenTime,
  ArticleTitle,
  ArticleCreatedTime,
} from "./article-value";

export class Article {
  readonly id: ArticleID;
  title?: ArticleTitle;
  body?: ArticleBody;
  openTime?: ArticleOpenTime;
  created: ArticleCreatedTime;

  constructor(id: ArticleID, created: ArticleCreatedTime) {
    this.id = id;
    this.created = created;
  }
}

export interface ArticleWriteRepository {
  put(aritcle: Article): Promise<void>;
  remove(id: ArticleID): Promise<void>;
}