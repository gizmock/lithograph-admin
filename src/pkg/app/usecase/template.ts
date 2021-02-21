import { Template, TemplateRepository } from "../../domain/template";

export class TemplateUsecase {
  private readonly repository: TemplateRepository;

  constructor(repository: TemplateRepository) {
    this.repository = repository;
  }

  async saveTemplate(input: {
    id: string;
    title: string;
    body: string;
  }): Promise<void> {
    const template = new Template(input.id, {
      title: input.title,
      body: input.body,
    });
    await this.repository.put(template);
  }

  async removeTemplate(id: string): Promise<void> {
    await this.repository.remove(id);
  }
}
