export type User = {
  id: number | string;
  username: string;
  nome?: string;
  email?: string;
};

export type UserCreateInput = {
  username: string;
  email: string;
  password: string;
};

export type AuthSessionUser = {
  accessToken: string | null;
  user: User | null;
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

export type PhotoComment = {
  comment_ID: string;
  comment_author: string;
  comment_content: string;
};

export type PhotoDetails = {
  photo: Photo;
  comments: PhotoComment[];
};

export type PhotoStats = {
  id?: number;
  title: string;
  acessos: number;
};

export type PhotoListParams = {
  page: number;
  total: number;
  user: number | string;
};

export type PasswordLostInput = {
  login: string;
  url: string;
};

export type PasswordResetInput = {
  password: string;
};

export type ApiResponse<TData> = {
  response: Response;
  data: TData;
};
