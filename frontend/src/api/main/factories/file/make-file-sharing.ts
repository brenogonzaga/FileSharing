import { FileSharing } from '@/api/use-cases/file';
import { makeUrlFactory, makeAxiosHttpFactory } from '@/api/main/factories/axios';

export const makeFileSharingFactory = () => {
  return new FileSharing(makeUrlFactory(), makeAxiosHttpFactory());
};
