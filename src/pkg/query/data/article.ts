export type ArticleData = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly openTime: Date;
  readonly created: Date;
};

export type ArticleList = {
  datas: ArticleData[];
};

export interface ArticleReadRepository {
  get(id: string): Promise<ArticleData>;
  findByTitle(title: string): Promise<ArticleList>;
}