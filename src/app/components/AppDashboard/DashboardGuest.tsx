// 'use client'

// /** @jsxImportSource @emotion/react */
// import { Button } from "@mui/material";
// import Head from "next/head";
// import Link from "next/link";
// import { css, keyframes } from "@emotion/react";

// const fadeInUp = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const animatedBlock = css`
//   animation: ${fadeInUp} 1s ease-out;
// `;

// export default function Home() {
//   return (
//     <>
//       <Head>
//       <title>Phần mềm quản lý tích hợp mạnh mẽ</title>
//         <meta
//           name="description"
//           content="Khám phá công nghệ và quy trình sản xuất gỗ mica hiện đại nhất."
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
//           rel="stylesheet"
//         />
//       </Head>

//       <main style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: "#f0f7f2" }}>
//         <header
//           css={css`
//             ${animatedBlock};
//             background-color: #8DB883;
//             color: white;
//             padding: 2rem 1rem;
//             position: relative;
//           `}
//         >
//           <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
//             <Link href="/login" passHref>
//               <Button variant="outlined" color="inherit" size="small" style={{ marginRight: "0.5rem" }}>
//                 Đăng nhập
//               </Button>
//             </Link>
//             {/* <Link href="/dang_ky" passHref>
//               <Button variant="contained" color="secondary" size="small">
//                 Đăng ký
//               </Button>
//             </Link> */}
//           </div>
//           <h1 style={{ fontSize: "3rem", marginBottom: "1rem", textAlign: "center" }}>
//             Giải pháp phần mềm tích hợp toàn diện
//           </h1>
//           <p style={{ fontSize: "1.25rem", textAlign: "center" }}>
//             Vận hành – Đặt hàng – Kế toán – Xuất hóa đơn – Tất cả trong một
//           </p>
//           <div style={{ textAlign: "center" }}>
//             <Button variant="contained" color="secondary" style={{ marginTop: "1.5rem" }}>
//               Dùng thử miễn phí
//             </Button>
//           </div>
//         </header>

//         <section
//           css={css`
//             ${animatedBlock};
//             padding: 4rem 2rem;
//             background-color: #e6f0e9;
//           `}
//         >
//           <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>Quy trình sản xuất</h2>
//           <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "2rem" }}>
//             <Step icon="⚙️" title="Quản lý vận hành" desc="Tối ưu hóa quy trình hoạt động và tự động hóa tác vụ." />
//             <Step icon="🛒" title="Đặt hàng thông minh" desc="Theo dõi, quản lý đơn hàng và kho vận một cách hiệu quả." />
//             <Step icon="📊" title="Kế toán chính xác" desc="Đồng bộ hóa sổ sách kế toán, báo cáo tài chính tức thì." />
//             <Step icon="🧾" title="Xuất hóa đơn điện tử" desc="Tích hợp hóa đơn điện tử theo chuẩn quy định, dễ dàng và nhanh chóng." />
//           </div>
//         </section>

//         <section
//           css={css`
//             ${animatedBlock};
//             padding: 4rem 2rem;
//             background-color: white;
//           `}
//         >
//           <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>Tại sao chọn chúng tôi</h2>
//           <ul style={{ maxWidth: "700px", margin: "auto", fontSize: "1.1rem", lineHeight: "1.8" }}>
//           <li>Giao diện thân thiện, dễ sử dụng trên mọi thiết bị</li>
//             <li>Hiệu năng cực mạnh, xử lý hàng nghìn giao dịch mỗi ngày</li>
//             <li>Đội ngũ hỗ trợ 24/7, đồng hành cùng bạn mọi lúc</li>
//             <li>Chi phí hợp lý, linh hoạt theo quy mô doanh nghiệp</li>
//           </ul>
//         </section>

//         <footer style={{ backgroundColor: "#4f6f52", color: "white", textAlign: "center", padding: "2rem 1rem" }}>
//           <p>Bản quyền © 2025 Giải pháp phần mềm tích hợp doanh nghiệp</p>
//         </footer>
//       </main>
//     </>
//   );
// }

// function Step({ icon, title, desc }: { icon: string; title: string; desc: string }) {
//   return (
//     <div
//       css={css`
//         ${animatedBlock};
//         background-color: white;
//         border-radius: 12px;
//         padding: 2rem;
//         max-width: 280px;
//         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//       `}
//     >
//       <div style={{ fontSize: "2rem" }}>{icon}</div>
//       <h3 style={{ fontSize: "1.2rem", marginTop: "1rem" }}>{title}</h3>
//       <p style={{ fontSize: "0.95rem", color: "#555" }}>{desc}</p>
//     </div>
//   );
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Stack,
  CircularProgress,
  Slide
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const SlideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function HomePage() {
  // trạng thái dialog
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  // trạng thái loading khi login/register
  const [loading, setLoading] = useState(false);

  // Login form
  const [companyCode, setCompanyCode] = useState('');

  // Register form
  const [urlCompany, setUrlCompany] = useState('');
  const [fullname, setfullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');

  const resetRegisterForm = () => {
    setUrlCompany('');
    setfullname('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
    setPhone('');
    setBirthday('');
  };

  const resetLoginForm = () => {
    setCompanyCode('');
    setLoading(false);
  };

  // Xử lý login
  const handleLogin = async () => {
    if (!companyCode) return alert('Vui lòng nhập mã công ty');

    setLoading(true);
    const code = companyCode.toLowerCase();

    try {
      const res = await fetch('http://api.fbopro.vn/v1/auth/check-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyCode: code }),
      });

      if (!res.ok) {
        alert('Công ty không tồn tại');
        setLoading(false);
        return;
      }

      window.location.href = `http://${code}.fbopro.vn:3000/login`;
    } catch (err) {
      console.error('Lỗi khi gọi API:', err);
      alert('Không thể kết nối tới máy chủ');
      setLoading(false);
    }
  };

  // Xử lý đăng ký gom 1 form
  const handleRegister = async () => {
    if (!urlCompany || !fullname || !username || !password || !confirmPassword || !email || !phone || !birthday) {
      alert("Vui lòng nhập đầy đủ tất cả các trường.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        companyCode: urlCompany.toLowerCase(),
          fullname,
          username,
          password,
          email,
          phone,
          birthday
      };

      const res = await fetch('http://api.fbopro.vn/v1/users/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert('Đăng ký thất bại: ' + (errorData.message || ''));
        setLoading(false);
        return;
      }

      alert('Đăng ký thành công!');
      resetRegisterForm();
      setOpenRegister(false);
    } catch (err) {
      console.error('Lỗi khi đăng ký:', err);
      alert('Đăng ký thất bại, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h5" color="primary">Chào mừng đến với FBO</Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => setOpenLogin(true)}>Đăng nhập</Button>
          <Button variant="outlined" onClick={() => setOpenRegister(true)}>Đăng ký</Button>
        </Stack>

        {/* Dialog Đăng nhập */}
        <Dialog open={openLogin} onClose={() => { resetLoginForm(); setOpenLogin(false); }} maxWidth="xs" fullWidth>
          <Box sx={{ backgroundColor: 'white' }}>
            <DialogTitle sx={{ fontWeight: 'bold', pb: 0 }}>Đăng nhập tài khoản FBO</DialogTitle>
            <DialogContent sx={{ pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <TextField
                  variant="outlined"
                  placeholder="Mã công ty"
                  value={companyCode}
                  onChange={(e) => setCompanyCode(e.target.value)}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#666' },
                      '&:hover fieldset': { borderColor: '#aaa' },
                      '&.Mui-focused fieldset': { borderColor: '#90caf9' }
                    },
                  }}
                  InputProps={{
                    endAdornment: <Typography sx={{ ml: 1, color: '#aaa' }}>fbopro.vn</Typography>,
                  }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ color: '#aaa' }}>
                  Bạn chưa có gian hàng trên FBO?{' '}
                  <Button variant="text" sx={{ p: 0, color: '#4fc3f7' }} onClick={() => { resetLoginForm(); setOpenLogin(false); setOpenRegister(true); }}>
                    Dùng thử miễn phí
                  </Button>
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button
                variant="contained"
                onClick={handleLogin}
                disabled={loading}
                sx={{
                  bgcolor: '#2196f3',
                  color: 'white',
                  '&:hover': { bgcolor: '#1976d2' },
                  px: 4,
                }}
              >
                {loading ? <CircularProgress size={20} color="inherit" /> : 'Vào cửa hàng'}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* Dialog Đăng ký */}
        <Dialog
          open={openRegister}
          onClose={() => { resetRegisterForm(); setOpenRegister(false); }}
          maxWidth="lg"
          fullWidth
          scroll="paper"
          TransitionComponent={SlideTransition}
          sx={{ '& .MuiPaper-root': { borderRadius: 4, minHeight: '600px', maxHeight: '90vh' } }}
        >
          <Box display="flex" height="100%">
            <Box flex="1" sx={{
              backgroundImage: 'url("https://img5.thuthuatphanmem.vn/uploads/2021/09/22/background-cay-xanh-anime_095057518.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', px: 4
            }}>
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Quản lý dễ dàng<br />Bán hàng đơn giản
              </Typography>
            </Box>

            <Box flex="1.2" p={5} bgcolor="#fff" display="flex" flexDirection="column" justifyContent="space-between" minHeight="600px">
              <Box flex={1} display="flex" flexDirection="column" justifyContent="center" gap={2}>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: 22, px: 0 }}>
                  Đăng ký công ty và tài khoản quản trị
                </DialogTitle>
               <DialogContent sx={{ px: 0, pt: 1 }}>
  <Stack
    spacing={2}               // Khoảng cách giữa các input
    sx={{
      maxWidth: 400,          // Giới hạn chiều rộng form (tùy chỉnh)
      margin: 'auto',         // Căn giữa form
    }}
  >
   <TextField
  fullWidth
  value={urlCompany}
  onChange={(e) => setUrlCompany(e.target.value)}
  placeholder="Đường dẫn công ty"
  sx={{
    '& .MuiInputBase-root': {
      height: 38,           // Độ cao input phù hợp
      fontSize: 14,         // Cỡ chữ trong input
    // Padding trái để chữ không sát mép
      borderRadius: 1,      // Bo góc nhẹ
    },
    '& .MuiInputLabel-root': {
      fontWeight: 600,      // Đậm chữ label
      fontSize: 15,
      color: '#333',
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: 0.6,         // Độ mờ placeholder vừa phải
      fontSize: 14,
      fontWeight: 400,
    },
  }}
/>

    <TextField
     placeholder="Họ và tên"
      fullWidth
      value={fullname}
      onChange={(e) => setfullname(e.target.value)}
      sx={{
      '& .MuiInputBase-root': {
        height: 38,           // Độ cao input phù hợp
        fontSize: 14,         // Cỡ chữ trong input
      // Padding trái để chữ không sát mép
        borderRadius: 1,      // Bo góc nhẹ
      },
      '& .MuiInputLabel-root': {
        fontWeight: 600,      // Đậm chữ label
        fontSize: 15,
        color: '#333',
      },
      '& .MuiInputBase-input::placeholder': {
        opacity: 0.6,         // Độ mờ placeholder vừa phải
        fontSize: 14,
        fontWeight: 400,
      },
  }}
    />
    <TextField
    placeholder="Tên đăng nhập"
      fullWidth
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      sx={{
    '& .MuiInputBase-root': {
      height: 38,           // Độ cao input phù hợp
      fontSize: 14,         // Cỡ chữ trong input
    // Padding trái để chữ không sát mép
      borderRadius: 1,      // Bo góc nhẹ
    },
    '& .MuiInputLabel-root': {
      fontWeight: 600,      // Đậm chữ label
      fontSize: 15,
      color: '#333',
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: 0.6,         // Độ mờ placeholder vừa phải
      fontSize: 14,
      fontWeight: 400,
    },
  }}
    />
    <TextField
      placeholder="Mật khẩu"
      type="password"
      fullWidth
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      sx={{
    '& .MuiInputBase-root': {
      height: 38,           // Độ cao input phù hợp
      fontSize: 14,         // Cỡ chữ trong input
    // Padding trái để chữ không sát mép
      borderRadius: 1,      // Bo góc nhẹ
    },
    '& .MuiInputLabel-root': {
      fontWeight: 600,      // Đậm chữ label
      fontSize: 15,
      color: '#333',
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: 0.6,         // Độ mờ placeholder vừa phải
      fontSize: 14,
      fontWeight: 400,
    },
  }}
    />
    <TextField
      placeholder="Nhập lại mật khẩu"
      type="password"
      fullWidth
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      sx={{
    '& .MuiInputBase-root': {
      height: 38,           // Độ cao input phù hợp
      fontSize: 14,         // Cỡ chữ trong input
    // Padding trái để chữ không sát mép
      borderRadius: 1,      // Bo góc nhẹ
    },
    '& .MuiInputLabel-root': {
      fontWeight: 600,      // Đậm chữ label
      fontSize: 15,
      color: '#333',
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: 0.6,         // Độ mờ placeholder vừa phải
      fontSize: 14,
      fontWeight: 400,
    },
  }}
    />
    <TextField
    placeholder="Email"
      type="email"
      fullWidth
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      sx={{
    '& .MuiInputBase-root': {
      height: 38,           // Độ cao input phù hợp
      fontSize: 14,         // Cỡ chữ trong input
    // Padding trái để chữ không sát mép
      borderRadius: 1,      // Bo góc nhẹ
    },
    '& .MuiInputLabel-root': {
      fontWeight: 600,      // Đậm chữ label
      fontSize: 15,
      color: '#333',
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: 0.6,         // Độ mờ placeholder vừa phải
      fontSize: 14,
      fontWeight: 400,
    },
  }}
    />
    <TextField
    placeholder="Số điện thoại"
      fullWidth
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      sx={{
    '& .MuiInputBase-root': {
      height: 38,           // Độ cao input phù hợp
      fontSize: 14,         // Cỡ chữ trong input
    // Padding trái để chữ không sát mép
      borderRadius: 1,      // Bo góc nhẹ
    },
    '& .MuiInputLabel-root': {
      fontWeight: 600,      // Đậm chữ label
      fontSize: 15,
      color: '#333',
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: 0.6,         // Độ mờ placeholder vừa phải
      fontSize: 14,
      fontWeight: 400,
    },
  }}
    />
    <TextField
      type="date"
      fullWidth
      value={birthday}
      onChange={(e) => setBirthday(e.target.value)}
      sx={{
    '& .MuiInputBase-root': {
      height: 38,           // Độ cao input phù hợp
      fontSize: 14,         // Cỡ chữ trong input
    // Padding trái để chữ không sát mép
      borderRadius: 1,      // Bo góc nhẹ
    },
    '& .MuiInputLabel-root': {
      fontWeight: 600,      // Đậm chữ label
      fontSize: 15,
      color: '#333',
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: 0.6,         // Độ mờ placeholder vừa phải
      fontSize: 14,
      fontWeight: 400,
    },
  }}
      InputLabelProps={{ shrink: true }} // Để label không chồng lên date picker
    />
  </Stack>
</DialogContent>

              </Box>

              <DialogActions sx={{ px: 0, pt: 3 }}>
                <Button onClick={() => { resetRegisterForm(); setOpenRegister(false); }} color="inherit">
                  Hủy
                </Button>

                <Button
                  variant="contained"
                  onClick={handleRegister}
                  sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' }, color: '#fff' }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : 'Đăng ký'}
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Dialog>
      </Stack>
    </Container>
  );
}
