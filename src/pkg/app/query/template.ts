export type TemplateData = {
  readonly id: string;
  readonly name: string;
  readonly html: string;
};

export type TemplateSearchData = {
  readonly id: string;
  readonly name: string;
};

export type TemplateSearchResult = {
  datas: TemplateSearchData[];
};

export interface TemplateQueryService {
  get(id: string): Promise<TemplateData | undefined>;
}
