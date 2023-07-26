export type FileUploadModel = {
  file: File;
  password: string;
};

export type FileDownloadModel = {
  fileId: string;
  password: string;
};

export type FileShareModel = {
  fileId: string;
  username: string;
};
