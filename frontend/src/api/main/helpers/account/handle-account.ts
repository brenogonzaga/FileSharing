import { SignupModel, LoginModel } from '@/api/models/account';
import { makeAccountFactory } from '@/api/main/factories/account';

const account = makeAccountFactory();

export const handleSignup = async (params: SignupModel): Promise<string> => {
  const result = await account.signup(params);
  return result.data;
};

export const handleLogin = async (params: LoginModel): Promise<string> => {
  const result = await account.login(params);
  if (result.statusCode === 200) {
    localStorage.setItem('token', result.data);
    return 'Você está logado!';
  }
  return result.data;
};

export const handleRefresh = async (): Promise<boolean> => {
  const result = await account.refresh();
  if (result.statusCode === 200) {
    localStorage.setItem('token', result.data);
    return true;
  }
  localStorage.removeItem('token');
  return false;
};
