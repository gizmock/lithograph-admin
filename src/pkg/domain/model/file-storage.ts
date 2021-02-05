export const ASSET_ROOT = "public/asset/";

export const ATTACHMENT_ROOT = "public/attachment/";

type StorageObjectMeta = {
  readonly lastModified?: Date;
  readonly size?: number;
};

export class StorageObject {
  static readonly delimiter = "/";

  readonly path: string;
  readonly name: string;
  readonly directory: boolean;
  readonly meta?: StorageObjectMeta;

  constructor(path: string, meta?: StorageObjectMeta) {
    this.path = path;
    this.directory = path.endsWith(StorageObject.delimiter);
    this.meta = meta;
    const split = this.path.split(StorageObject.delimiter);
    const position = this.directory ? split.length - 2 : split.length - 1;
    this.name = split[position];
  }
}

export type FileSaveProgress = {
  path: string;
  total: number;
  loaded: number;
};

export interface FileStorage {
  get(path: string): Promise<StorageObject>;
  list(prefix: string): Promise<StorageObject[]>;
  fileURL(path: string): Promise<string>;
  makeDirectory(path: string): Promise<void>;
  removeDirectory(prefix: string): Promise<void>;
  saveFile(
    path: string,
    blob: Blob,
    callback?: (progress: FileSaveProgress) => void
  ): Promise<void>;
  removeFile(path: string): Promise<void>;
}
