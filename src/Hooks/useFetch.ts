import { useCallback, useState } from 'react';

import type { ApiResponse } from '@/types';

type RequestResult<TData> = {
  response?: Response;
  json: TData | null;
};

type ApiRequester<TData> = () => Promise<ApiResponse<TData>>;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return 'Ocorreu um erro inesperado.';
};

const useFetch = <TData = unknown>() => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (
      requester: ApiRequester<TData> | RequestInfo | URL,
      options?: RequestInit,
    ): Promise<RequestResult<TData>> => {
      let response: Response | undefined;
      let json: TData | null = null;
      try {
        setError(null);
        setLoading(true);
        if (typeof requester === 'function') {
          const result = await requester();
          response = result.response;
          json = result.data;
        } else {
          response = await fetch(requester, options);
          json = (await response.json()) as TData;
          if (response.ok === false) throw new Error('Erro ao comunicar com a API.');
        }
      } catch (err) {
        json = null;
        setError(getErrorMessage(err));
      } finally {
        setData(json);
        setLoading(false);
      }

      return { response, json };
    },
    [],
  );

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
