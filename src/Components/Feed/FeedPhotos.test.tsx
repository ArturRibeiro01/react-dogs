import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { photoApi } from '@/api';
import { renderWithProviders } from '@/test/renderWithProviders';
import type { ApiResponse, Photo } from '@/types';

import FeedPhotos from './FeedPhotos';

vi.mock('@/api', () => ({
  photoApi: {
    list: vi.fn(),
  },
}));

const photos: Photo[] = [
  {
    id: 1,
    title: 'Nina',
    src: 'https://example.com/nina.jpg',
    acessos: 42,
  },
];

const createApiResponse = <TData,>(data: TData): ApiResponse<TData> => ({
  response: new Response(null, { status: 200 }),
  data,
});

const mockedList = vi.mocked(photoApi.list);

describe('FeedPhotos', () => {
  beforeEach(() => {
    mockedList.mockReset();
  });

  it('shows loading while photos are requested', async () => {
    mockedList.mockReturnValue(new Promise(() => undefined));

    renderWithProviders(<FeedPhotos onSelectPhoto={vi.fn()} />);

    expect(screen.getByRole('status')).toHaveTextContent('Carregando...');
  });

  it('renders an error message when the request fails', async () => {
    mockedList.mockRejectedValue(new Error('Falha ao buscar fotos.'));

    renderWithProviders(<FeedPhotos onSelectPhoto={vi.fn()} />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Falha ao buscar fotos.');
  });

  it('renders the empty state when no photos are returned', async () => {
    mockedList.mockResolvedValue(createApiResponse([]));

    renderWithProviders(<FeedPhotos onSelectPhoto={vi.fn()} />);

    expect(await screen.findByText('Nenhuma foto encontrada.')).toBeInTheDocument();
  });

  it('renders photos and selects a photo by id', async () => {
    const onSelectPhoto = vi.fn();
    mockedList.mockResolvedValue(createApiResponse(photos));

    renderWithProviders(<FeedPhotos user={7} onSelectPhoto={onSelectPhoto} />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));

    expect(mockedList).toHaveBeenCalledWith({ page: 1, total: 6, user: 7 });
    await userEvent.click(screen.getByRole('button', { name: /abrir detalhes da foto nina/i }));

    expect(onSelectPhoto).toHaveBeenCalledWith(1);
  });
});
