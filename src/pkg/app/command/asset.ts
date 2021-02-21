import { AssetObject, AssetStorage } from "../../domain/asset";

export type AssetRemoveCallback = (data: { path: string }) => void;

export class AsssetUsecase {
  private readonly storage: AssetStorage;

  constructor(storage: AssetStorage) {
    this.storage = storage;
  }

  async removeSelected(
    objs: AssetObject[],
    callback?: AssetRemoveCallback
  ): Promise<void> {
    for (const obj of objs) {
      if (obj.isDirectory()) {
        await this.storage.removeDirectory(obj.path());
      } else {
        await this.storage.removeFile(obj.path());
      }
      if (callback) {
        callback({ path: obj.path() });
      }
    }
  }
}
