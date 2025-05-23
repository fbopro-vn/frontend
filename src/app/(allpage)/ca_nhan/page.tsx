'use client'
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  TextField,
  Button,
  Paper,
} from '@mui/material';

const ProfilesPage = () => {
  // Thông tin User trong local
  const infoUser = JSON.parse(localStorage.getItem('user') || "")

  const [form, setForm] = useState({
    fullName: infoUser.fullname,
    address: infoUser.address,
    phone: infoUser.phone,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cập nhật:', form);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          maxWidth: 900,
          mx: 'auto',
          transition: '0.3s',
          '&:hover': {
            boxShadow: '0 0 16px rgba(0, 128, 128, 0.3)',
          },
        }}
      >
        <Typography variant="h5" mb={3} fontWeight="bold">
          Hồ sơ cá nhân
        </Typography>

        <Grid container spacing={4}>
          {/* Bên trái - Avatar + mô tả */}
          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              textAlign="center"
            >
              <Avatar
                src="/avatar.jpg"
                sx={{ width: 100, height: 100, boxShadow: 3 }}
              />
              <Typography variant="h6">{form.fullName}</Typography>
              <Typography variant="body2" color="text.secondary">
                Đây là thông tin bạn có thể cập nhật. Hãy chắc chắn là đúng!
              </Typography>
            </Box>
          </Grid>

          {/* Bên phải - Form */}
          <Grid item xs={12} md={8}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Họ và tên"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Địa chỉ"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Số điện thoại"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} display={'flex'} gap={2}>
                  <Button variant="contained" type="submit" sx={{ color: 'white'}}>
                    Lưu thay đổi
                  </Button>
                  <Button variant="contained" type="submit" sx={{ color: 'white'}}>
                    Đổi mật khẩu
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfilesPage;
