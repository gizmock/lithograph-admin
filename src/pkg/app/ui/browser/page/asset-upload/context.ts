import { createContext } from "react";
import { FileWithPath } from "react-dropzone";
import { FileSaveProgress } from "../../../../../domain/model/file-storage";

export type AssetUploadState = {
  prefix?: string;
  files: FileWithPath[];
  setFiles: (files: FileWithPath[]) => void;
  progress?: FileSaveProgress;
  setProgress: (progress: FileSaveProgress) => void;
};

export const AssetUploadStateContext = createContext({} as AssetUploadState);

export type AssetUploadAction = {};

export const AssetUploadActionContext = createContext({} as AssetUploadAction);
