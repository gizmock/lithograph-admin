type ArticleMeta = {
  readonly openTime: Date;
  readonly title: string;
  readonly body: string;
};

export class Article {
  readonly id: string;
  readonly meta: ArticleMeta;

  constructor(id: string, meta: ArticleMeta) {
    this.id = id;
    this.meta = meta;
  }
}
