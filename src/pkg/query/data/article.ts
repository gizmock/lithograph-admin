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
  leadEvaluatedKey?: string;
  lastEvaluatedKey?: string;
};

export type FindOption = {
  title: string;
  boundaryKey?: string;
  limit?: number;
};

export interface ArticleReadRepository {
  get(id: string): Promise<ArticleData | undefined>;
  findByTitle(
    option: FindOption,
    direction?: "before" | "after"
  ): Promise<ArticleSearchResult>;
}
