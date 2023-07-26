import axios from 'axios';
import { HttpClientResModel } from '@/api/models/http';

export class AxiosHttpClient {
  async post(url: string, body: any): Promise<HttpClientResModel> {
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return { statusCode: response.status, data: response.data };
    } catch (error: any) {
      if (!error.response) {
        return { statusCode: 500, data: error.message };
      }
      return { statusCode: error.response.status, data: error.response.data };
    }
  }

  async get(url: string): Promise<HttpClientResModel> {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return { statusCode: response.status, data: response.data };
    } catch (error: any) {
      if (!error.response) {
        return { statusCode: 500, data: error.message };
      }
      return { statusCode: error.response.status, data: error.response.data };
    }
  }

  async delete(url: string): Promise<HttpClientResModel> {
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return { statusCode: response.status, data: response.data };
    } catch (error: any) {
      if (!error.response) {
        return { statusCode: 500, data: error.message };
      }
      return { statusCode: error.response.status, data: error.response.data };
    }
  }

  async auth(url: string, body: any): Promise<HttpClientResModel> {
    try {
      const response = await axios.post(url, body);
      return { statusCode: response.status, data: response.data };
    } catch (error: any) {
      if (!error.response) {
        return { statusCode: 500, data: error.message };
      }
      return { statusCode: error.response.status, data: error.response.data };
    }
  }

  async file(url: string, body: any): Promise<HttpClientResModel> {
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: body.fileId ? 'arraybuffer' : 'json',
      });
      return { statusCode: response.status, data: response };
    } catch (error: any) {
      if (!error.response) {
        return { statusCode: 500, data: error.message };
      }
      return { statusCode: error.response.status, data: error.response.data };
    }
  }
}
