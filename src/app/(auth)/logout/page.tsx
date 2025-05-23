'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // 👈 Thêm dòng này

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // ❌ Không cần xóa localStorage nữa

    // ✅ Xóa cookie access_token
    Cookies.remove('access_token', { path: '/' });

    // ✅ Chuyển hướng về trang chủ
    router.push('/');
  }, [router]);

  return null; // Không cần render gì
};

export default Logout;
