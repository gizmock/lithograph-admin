import { TemplateHTML, TemplateID, TemplateName } from "./template-values";

export class Template {
  readonly id: TemplateID;
  name: TemplateName;
  html: TemplateHTML;

  constructor(
    id: TemplateID,
    values: {
      name: TemplateName;
      html: TemplateHTML;
    }
  ) {
    this.id = id;
    this.name = values.name;
    this.html = values.html;
  }
}

export interface TemplateRepository {
  put(template: Template): Promise<void>;
  remove(id: TemplateID): Promise<void>;
}
