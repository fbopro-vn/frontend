'use client'

import React, { useEffect, useState } from "react"
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import { setUser } from '@/app/redux/features/users/userSlice';

type UserType = {
  id: string
  email: string
  fullname?: string
  role?: string
  image?: string // thêm nếu bạn lưu avatar cho user
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: "spring" }
  }
}

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch()
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <Box sx={{ mt: '50px', textAlign: "center", padding: "2rem" }}>
      {user && (
        <>
          <Typography variant="h4" gutterBottom>
            Xin chào {user.fullname} 👋
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Card sx={{ width: 250, borderRadius: 4, boxShadow: 6 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2
                  }}
                >
                  <Avatar
                    src={"/images/default-avatar.jpg"}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Typography variant="h6" align="center">
                    {user.fullname}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    {user.role}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </>
      )}
    </Box>
  )
}

export default HomePage
