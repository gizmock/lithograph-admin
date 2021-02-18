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
  readonly sortKey: string;
};

export type ArticleSearchResult = {
  datas: ArticleSearchData[];
};

export type FindOption = {
  title: string;
  direction: "before" | "after";
  boundaryKey?: string;
  limit?: number;
};

export interface ArticleReadRepository {
  get(id: string): Promise<ArticleData | undefined>;
  findByTitle(option: FindOption): Promise<ArticleSearchResult>;
}
