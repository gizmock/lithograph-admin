export type ArticleData = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly published: Date;
};

export type ArticleSearchData = {
  readonly id: string;
  readonly title: string;
  readonly published: Date;
};

export type ArticleSearchResult = {
  datas: ArticleSearchData[];
  lastFoundKey?: string;
};

export type FindOption = {
  title: string;
  lastFondPosition?: string;
  limit?: number;
};

export interface ArticleReadRepository {
  get(id: string): Promise<ArticleData | undefined>;
  findByTitle(option: FindOption): Promise<ArticleSearchResult>;
}
