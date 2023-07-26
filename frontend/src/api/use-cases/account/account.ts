import { AxiosHttpClient } from '@/api/http';
import { SignupModel, LoginModel } from '@/api/models/account';
import { HttpClientResModel } from '@/api/models/http';

export class Account {
  constructor(private url: string, private httpClient: AxiosHttpClient) {}

  async signup(params: SignupModel): Promise<HttpClientResModel> {
    console.log('url', this.url);
    const result = await this.httpClient.auth(`${this.url}/auth/signup`, params);
    return result;
  }

  async login(params: LoginModel): Promise<HttpClientResModel> {
    const result = await this.httpClient.auth(`${this.url}/auth/login`, params);
    return result;
  }

  async refresh(): Promise<HttpClientResModel> {
    const result = await this.httpClient.get(`${this.url}/auth/refresh`);
    return result;
  }
}
