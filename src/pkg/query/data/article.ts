export type ArticleData = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly published: Date;
  readonly created: Date;
};

export type ArticleList = {
  datas: ArticleData[];
};

export interface ArticleReadRepository {
  get(id: string): Promise<ArticleData | undefined>;
  findByTitle(title: string): Promise<ArticleList>;
}
