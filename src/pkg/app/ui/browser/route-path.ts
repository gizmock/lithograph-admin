class PathProvider {
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  getURI() {
    return this.path;
  }
}

class PathProviderWithParam {
  private readonly path: PathProvider;
  private readonly param: string;

  constructor(path: string, param: string) {
    this.path = new PathProvider(path);
    this.param = param;
  }

  getParentURI() {
    return this.path.getURI();
  }

  getURIPattern() {
    const parent = this.path.getURI();
    return [parent + "/:" + this.param, parent];
  }

  makeURI(value: string) {
    return this.path.getURI() + "/" + encodeURIComponent(value);
  }
}

export const IndexPath = new PathProvider("/");

export const DashboardPath = new PathProvider("/dashboard");

export const AssetListPath = new PathProviderWithParam("/asset-list", "prefix");

export type AssetListPathParam =
  | {
      prefix?: string;
    }
  | undefined;

export const AssetUploadPath = new PathProviderWithParam(
  "/asset-upload",
  "prefix"
);

export type AssetUploadPathParam = {
  prefix: string;
};

export const AssetFilePath = new PathProviderWithParam("/asset-file", "path");

export type AssetFilePathParam = {
  path: string;
};

export const AssetDeletePath = new PathProviderWithParam(
  "/asset-delete",
  "prefix"
);

export type AssetDeletePathParam = {
  prefix: string;
};

export const ArticleListPath = new PathProvider("/article");

export const AccountPath = new PathProvider("/account");
