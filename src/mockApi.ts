import type {
  ApiResponse,
  AuthSessionUser,
  Breed,
  Dog,
  DogCreateInput,
  DogMembership,
  DogsListParams,
  DogsUser,
  DogsUserUpdateInput,
  DogUpdateInput,
  Media,
  MediaUploadInput,
  PasswordLostInput,
  PasswordResetInput,
  Photo,
  PhotoComment,
  PhotoDetails,
  PhotoListParams,
  PhotoStats,
  Post,
  PostCreateInput,
  PostsListParams,
  PostUpdateInput,
  User,
  UserCreateInput,
} from './types';

const DEMO_TOKEN = 'demo-token';
const DEMO_USERNAME = 'demo';
const DEMO_PASSWORD = 'Demo1234';

const demoUser: User = {
  id: 1,
  username: DEMO_USERNAME,
  nome: 'Demo',
  email: 'demo@dogs.local',
};

const demoDogsUser: DogsUser = {
  id: 'demo-user-id',
  username: DEMO_USERNAME,
  name: 'Demo',
  email: 'demo@dogs.local',
  city: 'Sao Paulo',
  state: 'SP',
};

const demoBreeds: Breed[] = [
  {
    id: 'breed-golden',
    name: 'Golden Retriever',
    slug: 'golden-retriever',
  },
  {
    id: 'breed-vira-lata',
    name: 'Vira-lata',
    slug: 'vira-lata',
  },
];

const demoDogs: Dog[] = [
  {
    id: 'dog-nina',
    slug: 'nina',
    name: 'Nina',
    breedId: demoBreeds[0].id,
    breed: demoBreeds[0],
    city: 'Sao Paulo',
    state: 'SP',
    interests: ['walks', 'community'],
    isPublic: true,
  },
  {
    id: 'dog-thor',
    slug: 'thor',
    name: 'Thor',
    breedId: demoBreeds[1].id,
    breed: demoBreeds[1],
    city: 'Sao Paulo',
    state: 'SP',
    interests: ['friendship'],
    isPublic: true,
  },
];

const demoPosts: Post[] = [
  {
    id: 'post-nina-1',
    dogId: demoDogs[0].id,
    authorUserId: demoDogsUser.id,
    caption: 'Passeio de domingo.',
    visibility: 'public',
    dog: demoDogs[0],
    author: demoDogsUser,
    media: [
      {
        id: 'media-nina-1',
        postId: 'post-nina-1',
        dogId: demoDogs[0].id,
        url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80',
        mimeType: 'image/jpeg',
      },
    ],
  },
];

const demoPhotos: Photo[] = [
  {
    id: 101,
    author: DEMO_USERNAME,
    title: 'Nina',
    src: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80',
    peso: '18',
    idade: '4',
    acessos: 1532,
  },
  {
    id: 102,
    author: DEMO_USERNAME,
    title: 'Thor',
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
    peso: '24',
    idade: '6',
    acessos: 2841,
  },
  {
    id: 103,
    author: 'lucas',
    title: 'Mel',
    src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
    peso: '12',
    idade: '3',
    acessos: 987,
  },
  {
    id: 104,
    author: 'ana',
    title: 'Bob',
    src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    peso: '9',
    idade: '2',
    acessos: 745,
  },
  {
    id: 105,
    author: 'marina',
    title: 'Luna',
    src: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80',
    peso: '15',
    idade: '5',
    acessos: 2190,
  },
  {
    id: 106,
    author: DEMO_USERNAME,
    title: 'Oliva',
    src: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=80',
    peso: '11',
    idade: '1',
    acessos: 608,
  },
];

const demoComments: Record<number, PhotoComment[]> = {
  101: [
    {
      comment_ID: '101-1',
      comment_author: 'ana',
      comment_content: 'Essa foto ficou linda.',
    },
    {
      comment_ID: '101-2',
      comment_author: DEMO_USERNAME,
      comment_content: 'Ela ficou parada por dois segundos. Um recorde.',
    },
  ],
  102: [
    {
      comment_ID: '102-1',
      comment_author: 'marina',
      comment_content: 'Thor parece pronto para uma aventura.',
    },
  ],
  103: [
    {
      comment_ID: '103-1',
      comment_author: 'lucas',
      comment_content: 'Mel sempre rouba a cena.',
    },
  ],
};

function delay(ms = 450): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function createResponse(status = 200): Response {
  return new Response(null, {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function mockResponse<TData>(data: TData, status = 200): Promise<ApiResponse<TData>> {
  await delay();
  return {
    response: createResponse(status),
    data,
  };
}

function createAuthError(): never {
  throw new Error('Use usuário demo e senha Demo1234.');
}

export const mockAuthApi = {
  login: async ({ email, password }: { email: string; password: string }) => {
    await delay();
    const isDemoLogin = email === DEMO_USERNAME || email === demoUser.email;
    if (!isDemoLogin || password !== DEMO_PASSWORD) createAuthError();

    return {
      accessToken: DEMO_TOKEN,
      user: demoUser,
    } satisfies AuthSessionUser;
  },

  signUp: async (body: UserCreateInput) => {
    await delay();
    return {
      accessToken: DEMO_TOKEN,
      user: {
        id: 2,
        username: body.username,
        email: body.email,
        nome: body.username,
      },
    } satisfies AuthSessionUser;
  },

  getSession: async () => {
    await delay(250);
    const token = window.localStorage.getItem('supabase-access-token');

    if (token !== DEMO_TOKEN) {
      return {
        accessToken: null,
        user: null,
      } satisfies AuthSessionUser;
    }

    return {
      accessToken: DEMO_TOKEN,
      user: demoUser,
    } satisfies AuthSessionUser;
  },

  logout: async () => {
    await delay(150);
  },

  onAuthStateChange: (_callback: (sessionUser: AuthSessionUser) => void) => {
    return {
      unsubscribe: () => undefined,
    };
  },
};

export const mockUserApi = {
  get: async (token: string) => {
    await delay(250);
    if (token !== DEMO_TOKEN) throw new Error('Usuário demo não autenticado.');
    return mockResponse<User>(demoUser, 200);
  },

  create: async (body: UserCreateInput) =>
    mockResponse<User>(
      {
        id: 2,
        username: body.username,
        email: body.email,
        nome: body.username,
      },
      201,
    ),
};

export const mockPasswordApi = {
  lost: async (_body: PasswordLostInput) => mockResponse<null>(null),

  reset: async (_body: PasswordResetInput) => mockResponse<null>(null),
};

export const mockPhotoApi = {
  create: async (formData: FormData) => {
    const title = String(formData.get('nome') || 'Foto demo');
    const photo: Photo = {
      id: Date.now(),
      author: DEMO_USERNAME,
      title,
      nome: title,
      src: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80',
      peso: String(formData.get('peso') || '0'),
      idade: String(formData.get('idade') || '0'),
      acessos: 0,
    };

    return mockResponse<Photo>(photo, 201);
  },

  get: async (id: number | string) => {
    const photo = demoPhotos.find((item) => String(item.id) === String(id));
    if (!photo) throw new Error('Foto demo não encontrada.');

    return mockResponse<PhotoDetails>({
      photo,
      comments: demoComments[photo.id] || [],
    });
  },

  list: async ({ page, total, user }: PhotoListParams) => {
    const photos =
      String(user) === '0'
        ? demoPhotos
        : demoPhotos.filter((photo) => photo.author === DEMO_USERNAME);
    const start = (page - 1) * total;

    return mockResponse<Photo[]>(photos.slice(start, start + total));
  },
};

export const mockHealthApi = {
  photos: () => mockPhotoApi.list({ page: 1, total: 1, user: 0 }),
};

export const mockStatsApi = {
  list: async () => {
    const stats = demoPhotos
      .filter((photo) => photo.author === DEMO_USERNAME)
      .map<PhotoStats>((photo) => ({
        id: photo.id,
        title: photo.title || photo.nome || 'Foto sem título',
        acessos: photo.acessos ?? photo.views ?? 0,
      }));

    return mockResponse<PhotoStats[]>(stats);
  },
};

export const mockDogsAuthApi = {
  me: async () => mockResponse<DogsUser>(demoDogsUser),

  sync: async () => mockResponse<DogsUser>(demoDogsUser),
};

export const mockDogsUserApi = {
  me: async () => mockResponse<DogsUser>(demoDogsUser),

  updateMe: async (body: DogsUserUpdateInput) =>
    mockResponse<DogsUser>({
      ...demoDogsUser,
      ...body,
    }),
};

export const mockBreedsApi = {
  list: async () => mockResponse<Breed[]>(demoBreeds),

  get: async (slug: string) => {
    const breed = demoBreeds.find((item) => item.slug === slug);
    if (!breed) throw new Error('Raça demo não encontrada.');
    return mockResponse<Breed>(breed);
  },
};

export const mockDogApi = {
  list: async (_params: DogsListParams = {}) => mockResponse<Dog[]>(demoDogs),

  get: async (slug: string) => {
    const dog = demoDogs.find((item) => item.slug === slug);
    if (!dog) throw new Error('Cachorro demo não encontrado.');
    return mockResponse<Dog>(dog);
  },

  create: async (body: DogCreateInput) =>
    mockResponse<Dog>(
      {
        ...body,
        id: `dog-${Date.now()}`,
        slug: body.name.toLowerCase().replace(/\s+/g, '-'),
      },
      201,
    ),

  update: async (dogId: string, body: DogUpdateInput) =>
    mockResponse<Dog>({
      ...(demoDogs.find((item) => item.id === dogId) || demoDogs[0]),
      ...body,
    }),

  remove: async (_dogId: string) => mockResponse<null>(null),

  members: async (dogId: string) =>
    mockResponse<DogMembership[]>([
      {
        id: 'membership-demo-owner',
        dogId,
        userId: demoDogsUser.id,
        role: 'owner',
        status: 'active',
        user: demoDogsUser,
      },
    ]),
};

export const mockPostsApi = {
  list: async (_params: PostsListParams = {}) => mockResponse<Post[]>(demoPosts),

  get: async (postId: string) => {
    const post = demoPosts.find((item) => item.id === postId);
    if (!post) throw new Error('Post demo não encontrado.');
    return mockResponse<Post>(post);
  },

  create: async (body: PostCreateInput) =>
    mockResponse<Post>(
      {
        id: `post-${Date.now()}`,
        ...body,
        authorUserId: demoDogsUser.id,
        dog: demoDogs.find((item) => item.id === body.dogId),
        author: demoDogsUser,
        media: [],
      },
      201,
    ),

  update: async (postId: string, body: PostUpdateInput) =>
    mockResponse<Post>({
      ...(demoPosts.find((item) => item.id === postId) || demoPosts[0]),
      ...body,
    }),

  remove: async (_postId: string) => mockResponse<null>(null),
};

export const mockMediaApi = {
  create: async ({ postId, file }: MediaUploadInput) =>
    mockResponse<Media>(
      {
        id: `media-${Date.now()}`,
        postId,
        url: URL.createObjectURL(file),
        mimeType: file.type,
        size: file.size,
      },
      201,
    ),
};
