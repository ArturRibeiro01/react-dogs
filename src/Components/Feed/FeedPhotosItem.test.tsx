import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/renderWithProviders';
import type { Photo } from '@/types';

import FeedPhotosItem from './FeedPhotosItem';

const photo: Photo = {
  id: 1,
  title: 'Nina',
  src: 'https://example.com/nina.jpg',
  acessos: 42,
};

describe('FeedPhotosItem', () => {
  it('renders photo title, image and views', () => {
    renderWithProviders(<FeedPhotosItem photo={photo} onSelect={vi.fn()} />);

    expect(screen.getByRole('img', { name: 'Nina' })).toHaveAttribute('src', photo.src);
    expect(screen.getByText('Nina')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('calls onSelect when the photo is clicked', async () => {
    const onSelect = vi.fn();

    renderWithProviders(<FeedPhotosItem photo={photo} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('button', { name: /abrir detalhes da foto nina/i }));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
