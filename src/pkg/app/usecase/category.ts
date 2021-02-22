import { Category, CategoryRepository } from "../../domain/category";

export class CategoryUsecase {
  private readonly repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async addCategory(input: { id: string; title: string }) {
    const exists = await this.repository.exists(input.id);
    if (exists) {
      throw new Error("category is already exist");
    }
    const category = new Category(input.id, {
      title: input.title,
    });
    await this.repository.put(category);
  }

  async updateCategory(input: { id: string; title: string }) {
    const exists = await this.repository.exists(input.id);
    if (!exists) {
      throw new Error("category is not exist");
    }
    const category = new Category(input.id, {
      title: input.title,
    });
    await this.repository.put(category);
  }

  async removeCategory(id: string) {
    await this.repository.remove(id);
  }
}
