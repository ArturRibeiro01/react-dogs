import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import useFetch from './useFetch';

type TestData = {
  message: string;
};

const UseFetchHarness = ({
  requester,
}: {
  requester: () => Promise<{ response: Response; data: TestData }>;
}) => {
  const { data, error, loading, request } = useFetch<TestData>();

  return (
    <div>
      <button type="button" onClick={() => request(requester)}>
        carregar
      </button>
      {loading && <p>Carregando</p>}
      {data && <p>{data.message}</p>}
      {error && <p role="alert">{error}</p>}
    </div>
  );
};

describe('useFetch', () => {
  it('stores data returned by a requester function', async () => {
    const requester = vi.fn().mockResolvedValue({
      response: new Response(null, { status: 200 }),
      data: { message: 'ok' },
    });

    render(<UseFetchHarness requester={requester} />);
    await userEvent.click(screen.getByRole('button', { name: /carregar/i }));

    expect(await screen.findByText('ok')).toBeInTheDocument();
    expect(requester).toHaveBeenCalledTimes(1);
  });

  it('stores a friendly error when requester fails', async () => {
    const requester = vi.fn().mockRejectedValue(new Error('Falha controlada'));

    render(<UseFetchHarness requester={requester} />);
    await userEvent.click(screen.getByRole('button', { name: /carregar/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Falha controlada');
  });
});
