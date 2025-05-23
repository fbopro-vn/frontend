import useSWR from 'swr';

const fetcher = (url: string) => fetch(url, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("access_token") || ''}`,
    'Content-Type': 'application/json',
  },
}).then(res => {
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
});

const useCartData = (url: string) => {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    refreshInterval: 0,       // tắt tự động refresh theo thời gian
    revalidateOnFocus: false, // tắt tự động fetch khi tab active lại
  });

  // Đảm bảo cartData là mảng, nếu data là undefined hoặc không phải mảng thì trả về mảng rỗng
  const cartData = Array.isArray(data) ? data : [];

  return {
    cartData,
    error: error ? error.message : null,
    isLoading,
    mutate, // bạn gọi mutate() để refetch thủ công khi 
    
  };
};

export default useCartData;
