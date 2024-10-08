import { useQuery } from '@tanstack/react-query';

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  return response.json();
};

export const useJsonQuery = (url) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [url],
    queryFn: () => fetchJson(url),
  });

  return [data, isLoading, error];
};
