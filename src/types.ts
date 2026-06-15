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
  pagination?: Pagination;
};

export type Pagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type DogsApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: unknown[];
  };
};

export type DogsUser = {
  id: string;
  username: string;
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  city?: string | null;
  state?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Breed = {
  id: string;
  name: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
};

export type DogInterest = 'friendship' | 'walks' | 'community' | 'breeding';
export type DogSex = 'male' | 'female' | 'unknown';
export type DogSize = 'small' | 'medium' | 'large' | 'giant';
export type DogMembershipRole = 'owner' | 'editor';
export type DogMembershipStatus = 'active' | 'pending' | 'removed';
export type PostVisibility = 'public' | 'private' | 'unlisted';

export type Dog = {
  id: string;
  slug: string;
  name: string;
  breedId?: string | null;
  breed?: Breed | null;
  birthDate?: string | null;
  sex?: DogSex | null;
  size?: DogSize | null;
  weight?: number | null;
  bio?: string | null;
  avatarUrl?: string | null;
  city?: string | null;
  state?: string | null;
  interests?: DogInterest[];
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type DogMembership = {
  id: string;
  dogId: string;
  userId: string;
  role: DogMembershipRole;
  status: DogMembershipStatus;
  invitedByUserId?: string | null;
  user?: DogsUser;
  createdAt?: string;
  updatedAt?: string;
};

export type Media = {
  id: string;
  postId: string;
  dogId?: string;
  uploadedByUserId?: string;
  storageBucket?: string;
  storageKey?: string;
  url: string;
  mimeType?: string;
  size?: number;
  width?: number | null;
  height?: number | null;
  createdAt?: string;
};

export type Post = {
  id: string;
  dogId: string;
  authorUserId?: string;
  caption?: string | null;
  visibility?: PostVisibility;
  publishedAt?: string | null;
  dog?: Dog;
  author?: DogsUser;
  media?: Media[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export type DogsListParams = {
  breed?: string;
  city?: string;
  state?: string;
  interest?: DogInterest | string;
  page?: number;
  perPage?: number;
};

export type PostsListParams = {
  dog?: string;
  breed?: string;
  city?: string;
  state?: string;
  page?: number;
  perPage?: number;
};

export type DogCreateInput = {
  name: string;
  breedId?: string;
  birthDate?: string;
  sex?: DogSex;
  size?: DogSize;
  weight?: number;
  bio?: string;
  avatarUrl?: string;
  city?: string;
  state?: string;
  interests?: DogInterest[];
  isPublic?: boolean;
};

export type DogUpdateInput = Partial<DogCreateInput>;

export type PostCreateInput = {
  dogId: string;
  caption?: string;
  visibility?: PostVisibility;
};

export type PostUpdateInput = Partial<Omit<PostCreateInput, 'dogId'>>;

export type DogsUserUpdateInput = Partial<
  Pick<DogsUser, 'username' | 'name' | 'avatarUrl' | 'bio' | 'city' | 'state'>
>;

export type MediaUploadInput = {
  postId: string;
  file: File;
};
