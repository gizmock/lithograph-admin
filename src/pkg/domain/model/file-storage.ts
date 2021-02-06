export const PATH_DELIMITER = "/";
export const ASSET_ROOT = "public/asset/";
export const ATTACHMENT_ROOT = "public/attachment/";

class ObjectPath {
  private static readonly directoryNamePosition = 2;
  private static readonly fileNamePosition = 1;

  readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  isDirectory() {
    return this.path.endsWith(PATH_DELIMITER);
  }

  name() {
    const split = this.path.split(PATH_DELIMITER);
    const position = this.isDirectory()
      ? split.length - ObjectPath.directoryNamePosition
      : split.length - ObjectPath.fileNamePosition;
    return split[position];
  }
}

type StorageObjectMeta = {
  readonly lastModified?: Date;
  readonly size?: number;
};

export class StorageObject {
  private readonly objectPath: ObjectPath;
  private readonly meta?: StorageObjectMeta;

  constructor(path: string, meta?: StorageObjectMeta) {
    this.objectPath = new ObjectPath(path);
    this.meta = meta;
  }

  isDirectory() {
    return this.objectPath.isDirectory();
  }

  path() {
    return this.objectPath.path;
  }

  name() {
    return this.objectPath.name();
  }

  lastModified() {
    return this.meta?.lastModified;
  }

  size() {
    return this.meta?.size;
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
