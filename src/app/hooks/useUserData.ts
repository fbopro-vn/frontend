import { useState, useEffect } from 'react';

function formatVietnamDate(timestamp: any): string {
  if (!timestamp) return "";

  let date: Date;

  // Kiểm tra trường _seconds (Firestore Timestamp)
  if (typeof timestamp === 'object' && timestamp !== null && '_seconds' in timestamp) {
    date = new Date(timestamp._seconds * 1000);
  }
  else if (typeof timestamp === 'number') {
    date = timestamp > 1e10 ? new Date(timestamp) : new Date(timestamp * 1000);
  }
  else {
    date = new Date(timestamp);
  }

  if (isNaN(date.getTime())) {
    return "";
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


const useUserData = (url: string) => {
    const [userData, setUserData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const formattedData = data.map((user: any) => ({
              ...user,
              birthday: formatVietnamDate(user.birthday),
            }));

            setUserData(formattedData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { userData, error, isLoading, mutate: fetchData };
};

export default useUserData;


// Muate user k hoạt động fix sau