import {
  FileSaveProgress,
  FileStorage,
  StorageObject,
} from "../../domain/model/file-storage";

const STORAGE_DEMO_KEY = "console.storage-demo";

type FileStorageDemoObject = {
  path: string;
  meta?: {
    lastModified?: Date;
    size?: number;
  };
};

type FileStorageDemoData = {
  objs: FileStorageDemoObject[];
};

export class FileStorageDemo implements FileStorage {
  private readonly objs;

  constructor() {
    this.objs = new Set<StorageObject>();
    const json = sessionStorage.getItem(STORAGE_DEMO_KEY);
    if (json) {
      const data = JSON.parse(json) as FileStorageDemoData;
      data.objs.forEach((obj) =>
        this.objs.add(new StorageObject(obj.path, obj.meta))
      );
    }
  }

  async get(path: string): Promise<StorageObject> {
    for (const obj of Array.from(this.objs)) {
      if (obj.path === path) {
        return obj;
      }
    }
    throw new Error("no such file");
  }

  async list(prefix: string): Promise<StorageObject[]> {
    return Array.from(this.objs)
      .filter((obj) => obj.path.startsWith(prefix))
      .filter((obj) => {
        const name = obj.path.replaceAll(prefix, "");
        if (name === "") {
          return false;
        }
        const belowJudgeCount = name.endsWith(StorageObject.delimiter) ? 2 : 1;
        return name.split(StorageObject.delimiter).length === belowJudgeCount;
      })
      .map((obj) => {
        return new StorageObject(obj.path, {
          lastModified: obj.meta?.lastModified,
          size: obj.meta?.size,
        });
      });
  }

  async fileURL(path: string): Promise<string> {
    if (this.includesPath(path)) {
      return "/not-supported";
    }
    throw new Error("file not found");
  }

  async makeDirectory(path: string): Promise<void> {
    let makePath = "";
    for (const name of path.split(StorageObject.delimiter)) {
      makePath += name + StorageObject.delimiter;
      if (this.includesPath(makePath)) {
        continue;
      }
      const obj = new StorageObject(makePath, {
        lastModified: new Date(),
      });
      this.objs.add(obj);
    }
    this.save();
  }

  async removeDirectory(prefix: string): Promise<void> {
    const objs = await this.list(prefix);
    objs.forEach(this.objs.delete);
    this.save();
  }

  async saveFile(
    path: string,
    blob: Blob,
    callback?: (progress: FileSaveProgress) => void
  ): Promise<void> {
    const names = path.split(StorageObject.delimiter);
    let current = "";
    for (let i = 0; i < names.length; i++) {
      let size = undefined as number | undefined;
      if (i === names.length - 1) {
        current += names[i];
        size = blob.size;
      } else {
        current += names[i] + StorageObject.delimiter;
      }
      if (this.includesPath(current)) {
        continue;
      }
      const obj = new StorageObject(current, {
        lastModified: new Date(),
        size: size,
      });
      this.objs.add(obj);
    }
    if (callback) {
      callback({
        path: path,
        total: blob.size,
        loaded: blob.size,
      });
    }
    this.save();
  }

  async removeFile(path: string): Promise<void> {
    const obj = new StorageObject(path);
    this.objs.delete(obj);
    this.save();
  }

  private includesPath(path: string): boolean {
    return Array.from(this.objs)
      .map((obj) => obj.path)
      .includes(path);
  }

  private save() {
    const objs = Array.from(this.objs).map((obj) => {
      return {
        path: obj.path,
        meta: obj.meta,
      } as FileStorageDemoObject;
    });
    const data: FileStorageDemoData = { objs: objs };
    sessionStorage.setItem(STORAGE_DEMO_KEY, JSON.stringify(data));
  }
}
