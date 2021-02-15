import { ArticleReadRepository } from "../data/article";

type FindOption = {
  title: string;
  lastFondPosition?: string;
  limit?: number;
};

export class ArticleQueryService {
  private readonly respository: ArticleReadRepository;

  constructor(respository: ArticleReadRepository) {
    this.respository = respository;
  }

  async getArticle(id: string) {
    return await this.respository.get(id);
  }

  async findByTitle(option: FindOption) {
    return await this.respository.findByTitle(option);
  }
}
