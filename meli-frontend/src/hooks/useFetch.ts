import { useState, useEffect } from 'react';
import { type Status } from '@/types/common';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: Status;
  refetch: () => void;
}

export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setStatus('loading');
      setError(null);

      try {
        const result = await fetcher();
        if (!cancelled) {
          setData(result);
          setStatus('success');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setStatus('error');
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [...deps, trigger]);

  const refetch = () => setTrigger((prev) => prev + 1);

  return {
    data,
    loading: status === 'loading',
    error,
    status,
    refetch,
  };
}
