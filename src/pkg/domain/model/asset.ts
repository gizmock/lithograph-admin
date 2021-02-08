export const PATH_DELIMITER = "/";
export const ASSET_ROOT = "public/asset/";

export class AssetPrefix {
  readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  names() {
    return this.prefix.split(PATH_DELIMITER).filter((name) => name !== "");
  }

  getPositionPrefix(index: number) {
    return (
      this.names()
        .slice(0, index + 1)
        .join(PATH_DELIMITER) + PATH_DELIMITER
    );
  }
}

class AssetPath {
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
      ? split.length - AssetPath.directoryNamePosition
      : split.length - AssetPath.fileNamePosition;
    return split[position];
  }
}

type AssetMeta = {
  readonly lastModified?: Date;
  readonly size?: number;
};

export class AssetObject {
  private readonly objectPath: AssetPath;
  private readonly meta?: AssetMeta;

  constructor(path: string, meta?: AssetMeta) {
    this.objectPath = new AssetPath(path);
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

export interface AssetStorage {
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
