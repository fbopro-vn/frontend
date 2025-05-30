'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '@/app/redux/features/users/userSlice'
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AppInitializer() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      dispatch(clearUser());
      return;
    }

    axios.get('http://api.fbopro.vn/v1/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      dispatch(setUser(response.data));
    })
    .catch(error => {
      console.error('Không lấy được user:', error);
      localStorage.remove('access_token');
      dispatch(clearUser());
      router.push('/login');
    });
  }, []);

  return null;
}
