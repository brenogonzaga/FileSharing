import { Account } from '@/api/use-cases/account';
import { makeUrlFactory, makeAxiosHttpFactory } from '@/api/main/factories/axios';

export const makeAccountFactory = () => {
  return new Account(makeUrlFactory(), makeAxiosHttpFactory());
};
