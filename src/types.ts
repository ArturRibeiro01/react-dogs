export type User = {
  id: number;
  username: string;
  nome?: string;
  email?: string;
};

export type UserCreateInput = {
  username: string;
  email: string;
  password: string;
};

export type AuthTokenResponse = {
  token: string;
  user_display_name?: string;
  user_email?: string;
  user_nicename?: string;
};

export type Photo = {
  id: number;
  author?: string;
  title?: string;
  nome?: string;
  date?: string;
  src: string;
  peso?: string;
  idade?: string;
  acessos?: number;
  views?: number;
};

export type PhotoListParams = {
  page: number;
  total: number;
  user: number | string;
};

export type ApiResponse<TData> = {
  response: Response;
  data: TData;
};
