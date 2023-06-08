export type UserType = {
  id?: number;
  username?: string;
  email?: string;
  password: string;
  role?: boolean;
  phone: string;
  avatar?: string;
  onlinestatus: boolean;
};

export type UserSignUpType = {
  username?: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
};

export type UserHandlersType = {
  e: React.FormEvent<HTMLFormElement>;
  input: UserSignUpType;
};
