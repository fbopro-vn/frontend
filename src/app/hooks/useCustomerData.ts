// hooks/useCustomerData.ts
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch customers");
    return res.json();
  });

const useCustomerData = (url: string) => {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  });

  const customerData = Array.isArray(data) ? data : [];

  return {
    customerData,
    error: error ? error.message : null,
    isLoading,
    mutate,
  };
};

export default useCustomerData;
