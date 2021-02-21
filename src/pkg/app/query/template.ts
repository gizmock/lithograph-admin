export type TemplateData = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
};

export type TemplateSearchData = {
  readonly id: string;
  readonly title: string;
  readonly sortKey: string;
};

export type TemplateSearchResult = {
  datas: TemplateSearchData[];
};

export type ListOption = {
  direction: "before" | "after";
  boundaryKey?: string;
  limit?: number;
};

export interface TemplateQueryService {
  get(id: string): Promise<TemplateData | undefined>;
  list(option: ListOption): Promise<TemplateSearchResult>;
}
