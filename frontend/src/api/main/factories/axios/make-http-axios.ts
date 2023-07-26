import { AxiosHttpClient } from '@/api/http';

export const makeAxiosHttpFactory = () => {
  return new AxiosHttpClient();
};
