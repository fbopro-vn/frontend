// useFetchUsers.ts
import { useState, useEffect } from 'react';

// Custom hook để fetch dữ liệu khách hàng
const useUserData = (url: string) => {
    const [userData, setUserData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`, // Lấy token từ localStorage
                        'Content-Type': 'application/json', // Optional: để chắc chắn gửi kiểu dữ liệu JSON
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserData(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]); // Lắng nghe thay đổi URL nếu có

    return { userData, error, isLoading };

    // 
};

export default useUserData;
