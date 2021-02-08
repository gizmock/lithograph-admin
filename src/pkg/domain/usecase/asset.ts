import { AssetObject, AssetStorage } from "../model/asset";

export class AsssetUsecase {
  private readonly storage: AssetStorage;

  constructor(storage: AssetStorage) {
    this.storage = storage;
  }

  async removeSelected(objs: AssetObject[]): Promise<void> {
    for (const obj of objs) {
      if (obj.isDirectory()) {
        await this.storage.removeDirectory(obj.path());
      } else {
        await this.storage.removeFile(obj.path());
      }
    }
  }
}
