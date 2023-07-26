import { FileUploadModel, FileDownloadModel, FileShareModel } from '@/api/models/file';
import { FileResponse } from '@/api/models/file';
import { makeFileSharingFactory } from '@/api/main/factories/file';

const fileSharing = makeFileSharingFactory();

export const handleFileUpload = async (params: FileUploadModel): Promise<string> => {
  const result = await fileSharing.uploadFile(params);
  if (result.statusCode === 200) {
    return result.data.data;
  }
  return result.data;
};

export const handleFileDownload = async (params: FileDownloadModel): Promise<string> => {
  const response = await fileSharing.downloadFile(params);
  if (response.statusCode === 200) {
    const fileName = response.data.headers['content-disposition']
      .split('filename=')[1]
      .split(';')[0]
      .replace(/"/g, '');
    const blob = new Blob([response.data.data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    return 'Arquivo baixado com sucesso!';
  }
  return response.statusCode.toString();
};

export const handleFindFiles = async (): Promise<FileResponse[]> => {
  const response = await fileSharing.findFiles();
  return response.data;
};

export const handleFindSharedFiles = async (): Promise<FileResponse[]> => {
  const response = await fileSharing.findSharedFiles();
  return response.data;
};

export const handleShareFile = async (params: FileShareModel): Promise<string> => {
  const response = await fileSharing.shareFile(params);
  return response.data;
};

export const handleDeleteFile = async (fileId: string): Promise<string> => {
  const response = await fileSharing.deleteFile(fileId);
  return response.data;
};
