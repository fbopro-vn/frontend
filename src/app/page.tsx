// 'use client'
// import * as React from 'react';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import NextLink from 'next/link';
// import AppFeed from "@/components/app.feedback";
// import AppHeader from '@/components/AppHeader';
// import AppFooter from '@/components/app.footer';
// import { Provider } from 'react-redux';
// import AppBody from '@/components/app.body';
// import { store } from '../app/redux/store' ;  // Import store

// export default function Home() {
//   return (

//   //   <Box>
//   //       <AppHeader/>
//   //     <AppIntro/>
//   //     <Container maxWidth="lg">
//   //     <Box
//   //       sx={{
//   //         my: 4,
//   //         display: 'flex',
//   //         flexDirection: 'column',
//   //         justifyContent: 'center',
//   //         alignItems: 'center',
//   //       }}
//   //     >
//   //     <AppBody/>
//   //     <AppFeed/>

//   //       {/* <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
//   //         Material UI - Next.js App Router example in TypeScript
//   //       </Typography>
//   //       <Link href="/about" color="secondary" component={NextLink}>
//   //         Go to the about page
//   //       </Link>
//   // */}
//   //     </Box>
//   //   </Container>
//   //       <AppFooter/>
//   //   </Box>


//     <Box>
//       <Provider store={store}>
//             {/* LandingPage */}
//             <Box mt='53px'>
//               HomePage
//             </Box>
//             </Provider>


//     </Box>
//   );
// }

'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DashboardLoggedIn from './components/AppDashboard/DashboardLoggedIn'
import DashboardGuest from './components/AppDashboard/DashboardGuest'
import AppHeader from '@/app/components/AppHeader';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("access_token"); 
      if (!token) return;

      try {
        const res = await axios.get("http://api.fbopro.vn/v1/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
  
        // console.log("Kiểm tra người dùng", res.data);
  
        // 👉 Lưu user info vào localStorage
        localStorage.setItem("user", JSON.stringify(res.data));
  
        setIsLoggedIn(true);
      } catch (err) {
        console.log("Not logged in");
        setIsLoggedIn(false); // Later
      }
    };
  
    checkLogin();
  }, []);
  
  if (isLoggedIn === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Vui lòng đợi...</Typography>
      </Box>
    )
  }


  return (
    <>

      {isLoggedIn ? (
        <>
          <AppHeader />
          <DashboardLoggedIn />
        </>
      ) : (
        <DashboardGuest />
      )}

    </>
  )
}

export default Home


