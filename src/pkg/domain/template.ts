import { TemplateBody, TemplateID, TemplateTitle } from "./template-values";

export class Template {
  readonly id: TemplateID;
  title: TemplateTitle;
  body: TemplateBody;

  constructor(
    id: TemplateID,
    values: {
      title: TemplateTitle;
      body: TemplateBody;
    }
  ) {
    this.id = id;
    this.title = values.title;
    this.body = values.body;
  }
}

export interface TemplateRepository {
  put(template: Template): Promise<void>;
  remove(id: TemplateID): Promise<void>;
}
