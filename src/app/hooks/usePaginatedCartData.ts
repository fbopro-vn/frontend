import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`,
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  });

type Params = {
  pageSize: number;
  lastCreatedAt?: string;
  orderCode?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
};

function buildQuery(params: Params): string {
  const query = new URLSearchParams();
  query.append('pageSize', String(params.pageSize));

  if (params.lastCreatedAt) query.append('lastCreatedAt', params.lastCreatedAt);
  if (params.orderCode) query.append('orderCode', params.orderCode);
  if (params.createdAtFrom) query.append('createdAtFrom', params.createdAtFrom);
  if (params.createdAtTo) query.append('createdAtTo', params.createdAtTo);

  return query.toString();
}

const useCartData = (params: Params) => {
  const query = buildQuery(params);
  const url = `/api/orders/paginate?${query}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  });

  const cartData = Array.isArray(data) ? data : [];

  return {
    cartData,
    isLoading,
    error: error ? error.message : null,
    hasMore: cartData.length === params.pageSize, // dùng để disable nút "Trang sau"
    lastItemId: cartData.length ? cartData[cartData.length - 1]?.id : null,
    mutate,
  };
};

export default useCartData;

