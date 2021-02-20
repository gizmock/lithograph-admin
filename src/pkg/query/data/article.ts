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

export type TitleFindOption = {
  title: string;
  direction: "before" | "after";
  boundaryKey?: string;
  limit?: number;
};

export type PublishedDateFindOption = {
  from?: Date;
  to?: Date;
  direction: "before" | "after";
  boundaryKey?: string;
  limit?: number;
};

export interface ArticleReadRepository {
  get(id: string): Promise<ArticleData | undefined>;
  findByTitle(option: TitleFindOption): Promise<ArticleSearchResult>;
  findByPublishedDate(
    option: PublishedDateFindOption
  ): Promise<ArticleSearchResult>;
}
