import { createContext } from "react";
import { FileWithPath } from "react-dropzone";
import { AssetSaveProgress } from "../../../../../domain/model/asset";

export type AssetUploadState = {
  prefix?: string;
  files: FileWithPath[];
  setFiles: (files: FileWithPath[]) => void;
  progress?: AssetSaveProgress;
  setProgress: (progress: AssetSaveProgress) => void;
};

export const AssetUploadStateContext = createContext({} as AssetUploadState);

export type AssetUploadAction = {};

export const AssetUploadActionContext = createContext({} as AssetUploadAction);
