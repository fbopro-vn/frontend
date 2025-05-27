// hooks/useRoleData.ts
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch Roles");
    return res.json();
  });

const useRoleData = (url: string) => {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  });

  const roleData = Array.isArray(data) ? data : [];

  return {
    roleData,
    error: error ? error.message : null,
    isLoading,
    mutate,
  };
};

export default useRoleData;
