import { ArticleReadRepository } from "../data/article";

export class ArticleQueryService {
  private readonly respository: ArticleReadRepository;

  constructor(respository: ArticleReadRepository) {
    this.respository = respository;
  }

  async getArticle(id: string) {
    return await this.respository.get(id);
  }

  async findByTitle(title: string) {
    return await this.respository.findByTitle(title);
  }
}
