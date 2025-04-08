import useSWR from 'swr';
import { Holiday } from '../types/forms';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch holidays');
  }
  return response.json();
};

export function useHolidays() {
  const { data, error, isLoading, mutate } = useSWR<Holiday[]>(
    '/api/holidays',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 3600000,
    }
  );

  return {
    holidays: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
