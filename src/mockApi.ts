import type {
  ApiResponse,
  AuthTokenResponse,
  PasswordLostInput,
  PasswordResetInput,
  Photo,
  PhotoListParams,
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
  throw new Error('Use usuario demo e senha Demo1234.');
}

export const mockAuthApi = {
  login: async ({ username, password }: { username: string; password: string }) => {
    await delay();
    if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) createAuthError();

    return {
      response: createResponse(),
      data: {
        token: DEMO_TOKEN,
        user_display_name: demoUser.nome,
        user_email: demoUser.email,
        user_nicename: demoUser.username,
      } satisfies AuthTokenResponse,
    };
  },

  validateToken: async (token: string) => {
    await delay(250);
    if (token !== DEMO_TOKEN) throw new Error('Token demo invalido.');

    return {
      response: createResponse(),
      data: null,
    };
  },
};

export const mockUserApi = {
  get: async (token: string) => {
    await delay(250);
    if (token !== DEMO_TOKEN) throw new Error('Usuario demo nao autenticado.');
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

  reset: async ({ key }: PasswordResetInput) => {
    if (!key) throw new Error('Link de redefinicao invalido.');
    return mockResponse<null>(null);
  },
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
