import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { dogApi, mediaApi, postsApi } from '@/api';
import { renderWithProviders } from '@/test/renderWithProviders';
import type { ApiResponse, Dog, Media, Post } from '@/types';

import UserPhotoPost from './UserPhotoPost';

vi.mock('@/api', () => ({
  dogApi: {
    list: vi.fn(),
  },
  postsApi: {
    create: vi.fn(),
  },
  mediaApi: {
    create: vi.fn(),
  },
}));

const dog: Dog = {
  id: 'dog-nina',
  slug: 'nina',
  name: 'Nina',
  breedId: 'breed-golden',
  isPublic: true,
};

const post: Post = {
  id: 'post-nina',
  dogId: dog.id,
  caption: 'Nina no parque',
  visibility: 'public',
};

const media: Media = {
  id: 'media-nina',
  postId: post.id,
  url: 'https://cdn.example.com/nina.jpg',
  mimeType: 'image/jpeg',
  size: 1024,
};

const createApiResponse = <TData,>(data: TData): ApiResponse<TData> => ({
  response: new Response(null, { status: 200 }),
  data,
});

const mockedDogList = vi.mocked(dogApi.list);
const mockedPostCreate = vi.mocked(postsApi.create);
const mockedMediaCreate = vi.mocked(mediaApi.create);

const renderUserPhotoPost = () =>
  renderWithProviders(
    <Routes>
      <Route path="/conta/postar" element={<UserPhotoPost />} />
      <Route path="/conta" element={<p>Minha conta</p>} />
    </Routes>,
    { initialEntries: ['/conta/postar'] },
  );

describe('UserPhotoPost', () => {
  beforeEach(() => {
    mockedDogList.mockReset();
    mockedPostCreate.mockReset();
    mockedMediaCreate.mockReset();
    mockedDogList.mockResolvedValue(createApiResponse([dog]));
    mockedPostCreate.mockResolvedValue(createApiResponse(post));
    mockedMediaCreate.mockResolvedValue(createApiResponse(media));
  });

  it('creates a post and uploads the selected image', async () => {
    renderUserPhotoPost();

    const file = new File(['image'], 'nina.jpg', { type: 'image/jpeg' });

    await userEvent.selectOptions(await screen.findByLabelText('Cachorro'), dog.id);
    await userEvent.type(screen.getByLabelText('Legenda'), 'Nina no parque');
    await userEvent.upload(screen.getByLabelText('Imagem'), file);
    await userEvent.click(screen.getByRole('button', { name: /publicar/i }));

    await waitFor(() => {
      expect(mockedPostCreate).toHaveBeenCalledWith({
        dogId: dog.id,
        caption: 'Nina no parque',
        visibility: 'public',
      });
    });
    expect(mockedMediaCreate).toHaveBeenCalledWith({
      postId: post.id,
      file,
    });
    expect(await screen.findByText('Minha conta')).toBeInTheDocument();
  });

  it('validates accepted image formats before submitting', async () => {
    renderUserPhotoPost();

    const file = new File(['image'], 'nina.gif', { type: 'image/gif' });

    await userEvent.selectOptions(await screen.findByLabelText('Cachorro'), dog.id);
    await userEvent.upload(screen.getByLabelText('Imagem'), file, { applyAccept: false });
    await userEvent.click(screen.getByRole('button', { name: /publicar/i }));

    expect(await screen.findByText('Use uma imagem JPEG, PNG ou WebP.')).toBeInTheDocument();
    expect(mockedPostCreate).not.toHaveBeenCalled();
    expect(mockedMediaCreate).not.toHaveBeenCalled();
  });
});
