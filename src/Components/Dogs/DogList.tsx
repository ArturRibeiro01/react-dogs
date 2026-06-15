import { useEffect, useState, type FormEvent } from 'react';

import { breedsApi, dogApi } from '@/api';
import type { Breed, Dog } from '@/types';
import Button from '@components/Forms/Button';
import Error from '@components/Helper/Error';
import Loading from '@components/Helper/Loading';
import useFetch from '@hooks/useFetch';

import { EmptyMessage, FeedList } from '../Feed/FeedPhotos.styles';
import { DogCard, DogImage, DogInfo, FieldGroup, Filters } from './DogList.styles';

type DogFilters = {
  breed: string;
  city: string;
  state: string;
};

const DogList = () => {
  const [filters, setFilters] = useState<DogFilters>({
    breed: '',
    city: '',
    state: '',
  });
  const { data: breeds, request: requestBreeds } = useFetch<Breed[]>();
  const { data: dogs, loading, error, request } = useFetch<Dog[]>();

  useEffect(() => {
    requestBreeds(() => breedsApi.list());
  }, [requestBreeds]);

  useEffect(() => {
    request(() =>
      dogApi.list({
        breed: filters.breed || undefined,
        city: filters.city || undefined,
        state: filters.state || undefined,
        page: 1,
        perPage: 12,
      }),
    );
  }, [filters, request]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setFilters({
      breed: String(formData.get('breed') || ''),
      city: String(formData.get('city') || '').trim(),
      state: String(formData.get('state') || '').trim(),
    });
  }

  return (
    <>
      <Filters onSubmit={handleSubmit}>
        <FieldGroup>
          <label htmlFor="breed">Raça</label>
          <select id="breed" name="breed" defaultValue={filters.breed}>
            <option value="">Todas</option>
            {breeds?.map((breed) => (
              <option key={breed.id} value={breed.slug}>
                {breed.name}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup>
          <label htmlFor="city">Cidade</label>
          <input id="city" name="city" defaultValue={filters.city} />
        </FieldGroup>
        <FieldGroup>
          <label htmlFor="state">UF</label>
          <input id="state" name="state" defaultValue={filters.state} />
        </FieldGroup>
        <Button type="submit">Filtrar</Button>
      </Filters>

      {error && <Error error={error} />}
      {loading && <Loading />}
      {dogs && dogs.length === 0 && <EmptyMessage>Nenhum cachorro encontrado.</EmptyMessage>}
      {dogs && dogs.length > 0 && (
        <FeedList className="animeLeft">
          {dogs.map((dog) => (
            <DogCard key={dog.id}>
              <DogImage $imageUrl={dog.avatarUrl} />
              <DogInfo>
                <h2>{dog.name}</h2>
                <p>{dog.breed?.name || 'Raça não informada'}</p>
                {(dog.city || dog.state) && (
                  <p>{[dog.city, dog.state].filter(Boolean).join(' - ')}</p>
                )}
              </DogInfo>
            </DogCard>
          ))}
        </FeedList>
      )}
    </>
  );
};

export default DogList;
