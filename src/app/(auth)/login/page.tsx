'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  Fade,
  Slide
} from '@mui/material'
import axios from 'axios'
import { redirect, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import LogoFBO from '../../../../public/assets/logo_fbo_v2.png'
import { ContactlessOutlined } from '@mui/icons-material'
import Cookie from 'js-cookie';

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [companyCode, setCompanyCode] = useState('')
  const [showForgot, setShowForgot] = useState(false)
  const [showTransition, setShowTransition] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Lấy tên công ty từ subdomain
    const host = window.location.hostname; // sdc.fbopro.vn
    const code = host.split('.')[0];       // sdc
    setCompanyCode(code.toLowerCase());    // SDC
  }, []);
  

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const token = localStorage.getItem('access_token');
  //     if (!token) return null;

  //     try {
  //       const res = await fetch('http://api.sdc.com:8000/auth/profile', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });

  //       if (res.ok) {
  //         const user = await res.json();
  //         console.log('User auto-login:', user);
  //         router.push('/');
  //       } else {
  //         localStorage.remove('access_token');
  //       }
  //     } catch (error) {
  //       console.error('Error verifying token:', error);
  //       localStorage.remove('access_token')
  //     }
  //   };

  //   checkLogin();
  // }, [router]);

  const handleLogin = async () => {
    if (!username || !password) return alert('Vui lòng nhập đầy đủ username và mật khẩu')
    setLoading(true)

    try {
      const res = await fetch("http://api.sdc.com:8000/v1/auth/login", {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ username, password, companyCode }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        // ✅ Lưu accessToken thay vì toàn bộ user
        // ✅ Lưu access_token vào localStorage (tuỳ frontend cần)
        localStorage.setItem('access_token', data.accessToken);
      
        // ✅ Lưu access_token vào cookie để middleware có thể đọc được
        Cookie.set('access_token', data.accessToken, {
          path: '/',
          expires: 1 / 96, // 15 phút
          sameSite: 'Lax', // ✅ BẮT BUỘC để middleware nhận được
          // secure: window.location.protocol === 'https:', // true nếu dùng HTTPS
        });

        router.push('/');
      } else {
        alert('Sai thông tin đăng nhập');
      }
      setLoading(false);

    } catch (error) {
      alert("Lỗi đăng nhập");
  }
}

  const handleForgotTransition = () => {
    setShowTransition(true)
    setTimeout(() => {
      setShowForgot(true)
      setShowTransition(false)
    }, 700)
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#CFE2C4">
    <Box
      sx={{
        width: 900,
        height: 460,
        display: 'flex',
        borderRadius: 4,
        boxShadow: 6,
        overflow: 'hidden',
        backgroundColor: 'white',
        position: 'relative'
      }}
    >
      {/* Left panel */}
      {!showForgot && !showTransition && (
        <Slide direction="right" in={!showForgot && !showTransition} mountOnEnter unmountOnExit timeout={1000}>
          <Box
            sx={{
              width: '50%',
              p: 5,
              background: 'linear-gradient(to bottom right, #A3C59F, #8DB883)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16
            }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{
              display: 'flex', justifyContent: 'center'
            }}>Phần mềm FBO</Typography>
            <Typography variant="h5" fontWeight="bold" sx={{
              display: 'flex', justifyContent: 'center'
            }}>Finance & Business Operations</Typography>
            <Typography variant="h5" fontWeight="bold" sx={{
              display: 'flex', justifyContent: 'center'
            }} mt={4}>Quản lý tài chính</Typography>
              <Typography variant="h5" fontWeight="bold" sx={{
              display: 'flex', justifyContent: 'center'
            }}>& vận hành cho doanh nghiệp</Typography>
          </Box>
        </Slide>
      )}

      {showTransition && (
        <Box
          sx={{
            width: '50%',
            background: 'linear-gradient(to bottom right, #A3C59F, #8DB883)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      )}

      {/* Right Panel */}
      <Box
        sx={{
          width: '50%',
          px: 5,
          display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {!showForgot && !showTransition && (
          <Slide direction="left" in={!showForgot} mountOnEnter unmountOnExit timeout={1000}>
            <Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Image src={LogoFBO} alt='logo_fbo' width={190} height={190}/>
              </Box>
              <TextField label="Tên người dùng" fullWidth onChange={(e) => setUsername(e.target.value)} variant="outlined" />
              <TextField label="Mật khẩu" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} variant="outlined" sx={{ mt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <FormControlLabel control={<Checkbox />} label="Ghi nhớ đăng nhập" />
                <Link href="#" variant="body2" underline="hover" onClick={handleForgotTransition}>Quên mật khẩu?</Link>
              </Box>
              <Button variant="contained" fullWidth sx={{ bgcolor: '#8DB883', mt: 2, color: 'white' }} onClick={handleLogin}>Đăng nhập</Button>
            </Box>
          </Slide>
        )}

        {showForgot && !showTransition && (
          <Slide direction="left" in mountOnEnter unmountOnExit>
            <Box sx={{ my: 'auto'}}>
              <TextField label="Email" type="email" fullWidth variant="outlined" />
              <Button
                variant="contained"
                fullWidth
                sx={{ bgcolor: '#8DB883', mt: 2, color: 'white' }}
                onClick={() => alert('Liên kết đặt lại mật khẩu đã được gửi qua email.')}
              >
                Gửi yêu cầu
              </Button>
              <Button variant="text" fullWidth sx={{ mt: 1 }} onClick={() => setShowForgot(false)}>Quay lại đăng nhập</Button>
            </Box>
          </Slide>
        )}
      </Box>

      {showForgot && !showTransition && (
  <Box
    sx={{
      width: '50%',
      background: 'linear-gradient(to bottom right, #A3C59F, #8DB883)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <motion.div
       style={{ textAlign: 'center', paddingLeft: 24, paddingRight: 24 }}
       initial={{ y: 50, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        style={{ width: 80, height: 80, margin: '0 auto 16px' }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
          alt="gear icon"
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Quên mật khẩu?
      </Typography>
      <Typography variant="body1">
        Đừng lo, chúng tôi sẽ giúp bạn đặt lại mật khẩu qua email.
      </Typography>
      <Typography variant="body2" mt={2} fontStyle="italic">
        Hãy nhập email và làm theo hướng dẫn.
      </Typography>
    </motion.div>
    </Box>
      )}

    </Box>
  </Box>
  )
}

