import { CategoryTitle, CategoryID } from "./category-value";

export class Category {
  readonly id: CategoryID;
  title: CategoryTitle;

  constructor(
    path: CategoryID,
    values: {
      title: CategoryTitle;
    }
  ) {
    this.id = path;
    this.title = values.title;
  }
}

export interface CategoryRepository {
  put(category: Category): Promise<void>;
  exists(id: CategoryID): Promise<boolean>;
  remove(id: CategoryID): Promise<void>;
}
