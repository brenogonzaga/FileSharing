export type SignupModel = {
  name: string;
  username: string;
  password: string;
};

export type LoginModel = {
  username: string;
  password: string;
};

export type LoginResModel = {
  token: string;
  userId: string;
};
