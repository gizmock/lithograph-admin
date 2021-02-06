export const PATH_DELIMITER = "/";
export const ASSET_ROOT = "public/asset/";

class AssetObjectPath {
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
      ? split.length - AssetObjectPath.directoryNamePosition
      : split.length - AssetObjectPath.fileNamePosition;
    return split[position];
  }
}

type AssetObjectMeta = {
  readonly lastModified?: Date;
  readonly size?: number;
};

export class AssetObject {
  private readonly objectPath: AssetObjectPath;
  private readonly meta?: AssetObjectMeta;

  constructor(path: string, meta?: AssetObjectMeta) {
    this.objectPath = new AssetObjectPath(path);
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

export type AssetSaveProgress = {
  path: string;
  total: number;
  loaded: number;
};

export interface FileStorage {
  get(path: string): Promise<AssetObject>;
  list(prefix: string): Promise<AssetObject[]>;
  fileURL(path: string): Promise<string>;
  makeDirectory(path: string): Promise<void>;
  removeDirectory(prefix: string): Promise<void>;
  saveFile(
    path: string,
    blob: Blob,
    callback?: (progress: AssetSaveProgress) => void
  ): Promise<void>;
  removeFile(path: string): Promise<void>;
}
