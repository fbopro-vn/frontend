// hooks/useProductData.ts
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  });

const useProductData = (url: string) => {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  });

  const productData = Array.isArray(data) ? data : [];

  return {
    productData,
    error: error ? error.message : null,
    isLoading,
    mutate,
  };
};

export default useProductData;
