import { AxiosHttpClient } from '@/api/http';
import { FileUploadModel, FileDownloadModel, FileShareModel } from '@/api/models/file';
import { HttpClientResModel } from '@/api/models/http';

export class FileSharing {
  constructor(private url: string, private httpClient: AxiosHttpClient) {}

  async uploadFile(params: FileUploadModel): Promise<HttpClientResModel> {
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('password', params.password);
    const result = await this.httpClient.file(`${this.url}/file-sharing/upload`, formData);
    return result;
  }

  async downloadFile(params: FileDownloadModel): Promise<HttpClientResModel> {
    const result = await this.httpClient.file(`${this.url}/file-sharing/download`, params);
    return result;
  }

  async findFiles(): Promise<HttpClientResModel> {
    const result = await this.httpClient.get(`${this.url}/file-sharing/find`);
    return result;
  }

  async findSharedFiles(): Promise<HttpClientResModel> {
    const result = await this.httpClient.get(`${this.url}/file-sharing/find-shared`);
    return result;
  }

  async shareFile(params: FileShareModel): Promise<HttpClientResModel> {
    const result = await this.httpClient.post(`${this.url}/file-sharing/share`, params);
    return result;
  }

  async deleteFile(fileId: string): Promise<HttpClientResModel> {
    const result = await this.httpClient.delete(`${this.url}/file-sharing/delete/${fileId}`);
    return result;
  }
}
