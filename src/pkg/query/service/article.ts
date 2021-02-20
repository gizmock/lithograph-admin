import {
  ArticleReadRepository,
  PublishedDateFindOption,
  TitleFindOption,
} from "../data/article";

export class ArticleQueryService {
  private readonly respository: ArticleReadRepository;

  constructor(respository: ArticleReadRepository) {
    this.respository = respository;
  }

  async getArticle(id: string) {
    return await this.respository.get(id);
  }

  async findByTitle(option: TitleFindOption) {
    return await this.respository.findByTitle(option);
  }

  async findByPublishedDate(option: PublishedDateFindOption) {
    return await this.respository.findByPublishedDate(option);
  }
}
