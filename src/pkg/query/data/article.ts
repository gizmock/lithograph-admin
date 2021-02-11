export type ArticleData = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly published: Date;
};

export type ArticleSearchResult = {
  readonly id: string;
  readonly title: string;
  readonly published: Date;
};

export type ArticleSearchResultList = {
  results: ArticleSearchResult[];
};

export interface ArticleReadRepository {
  get(id: string): Promise<ArticleData | undefined>;
  findByTitle(title: string): Promise<ArticleSearchResultList>;
}
