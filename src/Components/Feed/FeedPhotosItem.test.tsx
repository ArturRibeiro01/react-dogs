import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/renderWithProviders';
import type { Post } from '@/types';

import FeedPhotosItem from './FeedPhotosItem';

const post: Post = {
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
};

describe('FeedPhotosItem', () => {
  it('renders post title, image and views placeholder', () => {
    renderWithProviders(<FeedPhotosItem post={post} onSelect={vi.fn()} />);

    expect(screen.getByRole('img', { name: 'Nina no parque' })).toHaveAttribute(
      'src',
      'https://example.com/nina.jpg',
    );
    expect(screen.getByText('Nina no parque')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('calls onSelect when the photo is clicked', async () => {
    const onSelect = vi.fn();

    renderWithProviders(<FeedPhotosItem post={post} onSelect={onSelect} />);
    await userEvent.click(
      screen.getByRole('button', { name: /abrir detalhes do post nina no parque/i }),
    );

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
