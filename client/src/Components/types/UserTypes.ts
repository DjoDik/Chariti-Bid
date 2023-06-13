export type UserType = {
  id?: number;
  username?: string;
  email?: string;
  password: string;
  role?: boolean;
  phone: string;
  avatar: string | undefined; // Обновлено: поле avatar не является необязательным
  onlinestatus: boolean;
};

export type UserSignUpType = {
  username?: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string | null; // Обновлено: поле avatar может принимать значение null
};
export type UserHandlersType = {
  e: React.FormEvent<HTMLFormElement>;
  input: UserSignUpType;
};
