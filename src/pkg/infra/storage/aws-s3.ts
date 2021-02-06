import { S3 } from "aws-sdk";
import mime from "mime-types";
import {
  AssetSaveProgress,
  FileStorage,
  AssetObject,
} from "../../domain/model/asset";

const S3_DELIMITER = "/";
const UPLOAD_STORAGE_CLASS = "INTELLIGENT_TIERING";

export class FileStorageS3 implements FileStorage {
  private readonly s3: S3;
  private readonly bucket: string;

  constructor(s3: S3, bucket: string) {
    this.s3 = s3;
    this.bucket = bucket;
  }

  async get(path: string): Promise<AssetObject> {
    const res = await this.s3
      .headObject({ Bucket: this.bucket, Key: path })
      .promise();
    return new AssetObject(path, {
      lastModified: res.LastModified,
      size: res.ContentLength,
    });
  }

  async list(prefix: string): Promise<AssetObject[]> {
    const objs = [] as AssetObject[];
    let truncated = true as boolean | undefined;
    let token = undefined as string | undefined;
    while (truncated) {
      const res = await this.s3
        .listObjectsV2({
          Bucket: this.bucket,
          Prefix: prefix,
          Delimiter: S3_DELIMITER,
          ContinuationToken: token,
        })
        .promise();
      if (res.CommonPrefixes) {
        const prefixes = res.CommonPrefixes.map((p) => {
          return new AssetObject(p.Prefix!);
        });
        objs.push(...prefixes);
      }
      if (res.Contents) {
        const contents = res.Contents.filter((c) => c.Key !== prefix).map(
          (c) => {
            return new AssetObject(c.Key!, {
              lastModified: c.LastModified,
              size: c.Size,
            });
          }
        );
        objs.push(...contents);
      }
      truncated = res.IsTruncated;
      token = res.NextContinuationToken;
    }
    return objs;
  }

  async fileURL(path: string): Promise<string> {
    const url = await this.s3.getSignedUrlPromise("getObject", {
      Bucket: this.bucket,
      Key: path,
    });
    return url;
  }

  async makeDirectory(path: string): Promise<void> {
    await this.s3
      .putObject({
        Bucket: this.bucket,
        Key: path.endsWith(S3_DELIMITER) ? path : path + S3_DELIMITER,
      })
      .promise();
  }

  async removeDirectory(prefix: string): Promise<void> {
    const objs = await this.list(prefix);
    for (const obj of objs) {
      if (obj.isDirectory()) {
        // remove child files
        await this.removeDirectory(obj.path());
        // remove self directory
        await this.removeFile(obj.path());
      } else {
        await this.removeFile(obj.path());
      }
    }
    // remove self directory
    await this.removeFile(prefix);
  }

  async saveFile(
    path: string,
    blob: Blob,
    callback?: (progress: AssetSaveProgress) => void
  ): Promise<void> {
    const type = mime.lookup(path);
    const managedUpload = this.s3.upload({
      Bucket: this.bucket,
      Key: path,
      Body: blob,
      ContentType: type ? type : "",
      StorageClass: UPLOAD_STORAGE_CLASS,
    });
    if (callback) {
      managedUpload.on("httpUploadProgress", (progress) => {
        callback({
          path: path,
          total: progress.total,
          loaded: progress.loaded,
        });
      });
    }
    await managedUpload.promise();
  }

  async removeFile(path: string): Promise<void> {
    await this.s3
      .deleteObject({
        Bucket: this.bucket,
        Key: path,
      })
      .promise();
  }
}
