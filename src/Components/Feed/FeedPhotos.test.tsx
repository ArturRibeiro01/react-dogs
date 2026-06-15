import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { photoApi, postsApi } from '@/api';
import { renderWithProviders } from '@/test/renderWithProviders';
import type { ApiResponse, Photo, Post } from '@/types';

import FeedPhotos from './FeedPhotos';

vi.mock('@/api', () => ({
  photoApi: {
    list: vi.fn(),
  },
  postsApi: {
    list: vi.fn(),
  },
}));

const posts: Post[] = [
  {
    id: 'post-1',
    dogId: 'dog-nina',
    caption: 'Nina no parque',
    dog: {
      id: 'dog-nina',
      slug: 'nina',
      name: 'Nina',
    },
    media: [
      {
        id: 'media-1',
        postId: 'post-1',
        url: 'https://example.com/nina.jpg',
      },
    ],
  },
];

const legacyPhotos: Photo[] = [
  {
    id: 1,
    title: 'Joel',
    src: 'https://example.com/joel.jpg',
  },
];

const createApiResponse = <TData,>(data: TData): ApiResponse<TData> => ({
  response: new Response(null, { status: 200 }),
  data,
});

const mockedPostsList = vi.mocked(postsApi.list);
const mockedPhotosList = vi.mocked(photoApi.list);

describe('FeedPhotos', () => {
  beforeEach(() => {
    mockedPostsList.mockReset();
    mockedPhotosList.mockReset();
    mockedPhotosList.mockResolvedValue(createApiResponse([]));
  });

  it('shows loading while photos are requested', async () => {
    mockedPostsList.mockReturnValue(new Promise(() => undefined));
    mockedPhotosList.mockReturnValue(new Promise(() => undefined));

    renderWithProviders(<FeedPhotos onSelectPost={vi.fn()} />);

    expect(screen.getByRole('status')).toHaveTextContent('Carregando...');
  });

  it('renders an error message when the request fails', async () => {
    mockedPostsList.mockRejectedValue(new Error('Falha ao buscar posts.'));

    renderWithProviders(<FeedPhotos onSelectPost={vi.fn()} />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Falha ao buscar posts.');
  });

  it('renders the empty state when no photos are returned', async () => {
    mockedPostsList.mockResolvedValue(createApiResponse([]));

    renderWithProviders(<FeedPhotos onSelectPost={vi.fn()} />);

    expect(await screen.findByText('Nenhum post encontrado.')).toBeInTheDocument();
  });

  it('renders posts and selects a post by id', async () => {
    const onSelectPost = vi.fn();
    mockedPostsList.mockResolvedValue(createApiResponse(posts));

    renderWithProviders(<FeedPhotos user={7} onSelectPost={onSelectPost} />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));

    expect(mockedPostsList).toHaveBeenCalledWith({ page: 1, perPage: 6 });
    await userEvent.click(screen.getByRole('button', { name: /abrir detalhes do post nina/i }));

    expect(onSelectPost).toHaveBeenCalledWith('post-1');
  });

  it('renders legacy photos while the new API has no posts', async () => {
    mockedPostsList.mockResolvedValue(createApiResponse([]));
    mockedPhotosList.mockResolvedValue(createApiResponse(legacyPhotos));

    renderWithProviders(<FeedPhotos onSelectPost={vi.fn()} />);

    expect(await screen.findByRole('img', { name: 'Joel' })).toBeInTheDocument();
    expect(mockedPhotosList).toHaveBeenCalledWith({ page: 1, total: 6, user: 0 });
  });
});
