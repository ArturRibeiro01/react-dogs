import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { breedsApi, dogApi } from '@/api';
import { renderWithProviders } from '@/test/renderWithProviders';
import type { ApiResponse, Breed, Dog } from '@/types';

import UserPhotoPost from './UserPhotoPost';

vi.mock('@/api', () => ({
  breedsApi: {
    list: vi.fn(),
  },
  dogApi: {
    create: vi.fn(),
  },
}));

const breeds: Breed[] = [
  {
    id: 'breed-golden',
    name: 'Golden Retriever',
    slug: 'golden-retriever',
  },
];

const dog: Dog = {
  id: 'dog-nina',
  slug: 'nina',
  name: 'Nina',
  breedId: 'breed-golden',
  isPublic: true,
};

const createApiResponse = <TData,>(data: TData): ApiResponse<TData> => ({
  response: new Response(null, { status: 200 }),
  data,
});

const mockedBreedsList = vi.mocked(breedsApi.list);
const mockedDogCreate = vi.mocked(dogApi.create);

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
    mockedBreedsList.mockReset();
    mockedDogCreate.mockReset();
    mockedBreedsList.mockResolvedValue(createApiResponse(breeds));
    mockedDogCreate.mockResolvedValue(createApiResponse(dog));
  });

  it('creates a dog using the selected breed', async () => {
    renderUserPhotoPost();

    await userEvent.type(screen.getByLabelText('Nome'), 'Nina');
    await userEvent.selectOptions(await screen.findByLabelText('Raça'), 'breed-golden');
    await userEvent.type(screen.getByLabelText('Cidade'), 'Sao Paulo');
    await userEvent.type(screen.getByLabelText('UF'), 'SP');
    await userEvent.type(screen.getByLabelText('Peso'), '18');
    await userEvent.click(screen.getByRole('button', { name: /cadastrar cachorro/i }));

    await waitFor(() => {
      expect(mockedDogCreate).toHaveBeenCalledWith({
        name: 'Nina',
        breedId: 'breed-golden',
        city: 'Sao Paulo',
        state: 'SP',
        weight: 18,
        sex: undefined,
        size: undefined,
        bio: undefined,
        isPublic: true,
      });
    });
    expect(await screen.findByText('Minha conta')).toBeInTheDocument();
  });
});
