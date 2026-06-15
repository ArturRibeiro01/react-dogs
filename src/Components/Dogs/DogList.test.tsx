import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { breedsApi, dogApi } from '@/api';
import { renderWithProviders } from '@/test/renderWithProviders';
import type { ApiResponse, Breed, Dog } from '@/types';

import DogList from './DogList';

vi.mock('@/api', () => ({
  breedsApi: {
    list: vi.fn(),
  },
  dogApi: {
    list: vi.fn(),
  },
}));

const breeds: Breed[] = [
  {
    id: 'breed-golden',
    name: 'Golden Retriever',
    slug: 'golden-retriever',
  },
];

const dogs: Dog[] = [
  {
    id: 'dog-nina',
    slug: 'nina',
    name: 'Nina',
    breedId: 'breed-golden',
    breed: breeds[0],
    city: 'Sao Paulo',
    state: 'SP',
    isPublic: true,
  },
];

const createApiResponse = <TData,>(data: TData): ApiResponse<TData> => ({
  response: new Response(null, { status: 200 }),
  data,
});

const mockedBreedsList = vi.mocked(breedsApi.list);
const mockedDogsList = vi.mocked(dogApi.list);

describe('DogList', () => {
  beforeEach(() => {
    mockedBreedsList.mockReset();
    mockedDogsList.mockReset();
    mockedBreedsList.mockResolvedValue(createApiResponse(breeds));
    mockedDogsList.mockResolvedValue(createApiResponse(dogs));
  });

  it('renders public dogs from Dogs API', async () => {
    renderWithProviders(<DogList />);

    expect(await screen.findByText('Nina')).toBeInTheDocument();
    expect(screen.getAllByText('Golden Retriever')).toHaveLength(2);
    expect(screen.getByText('Sao Paulo - SP')).toBeInTheDocument();
    expect(mockedDogsList).toHaveBeenCalledWith({
      breed: undefined,
      city: undefined,
      state: undefined,
      page: 1,
      perPage: 12,
    });
  });

  it('applies breed, city and state filters', async () => {
    renderWithProviders(<DogList />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));

    await userEvent.selectOptions(screen.getByLabelText('Raça'), 'golden-retriever');
    await userEvent.type(screen.getByLabelText('Cidade'), 'Santos');
    await userEvent.type(screen.getByLabelText('UF'), 'SP');
    await userEvent.click(screen.getByRole('button', { name: /filtrar/i }));

    expect(mockedDogsList).toHaveBeenLastCalledWith({
      breed: 'golden-retriever',
      city: 'Santos',
      state: 'SP',
      page: 1,
      perPage: 12,
    });
  });
});
