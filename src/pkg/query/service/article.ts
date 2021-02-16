import { ArticleReadRepository, FindOption } from "../data/article";

export class ArticleQueryService {
  private readonly respository: ArticleReadRepository;

  constructor(respository: ArticleReadRepository) {
    this.respository = respository;
  }

  async getArticle(id: string) {
    return await this.respository.get(id);
  }

  async findByTitleBefore(option: FindOption) {
    return await this.respository.findByTitle(option, "before");
  }

  async findByTitleAfter(option: FindOption) {
    return await this.respository.findByTitle(option, "after");
  }
}
