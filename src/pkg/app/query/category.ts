export type CategoryData = {
  readonly id: string;
  readonly title: string;
};

export type CategorySearchData = {
  readonly id: string;
  readonly title: string;
};

export type CategorySearchResult = {
  datas: CategorySearchData[];
};

export interface CategoryQueryService {
  get(id: string): Promise<CategoryData | undefined>;
  list(): Promise<CategorySearchResult>;
}
