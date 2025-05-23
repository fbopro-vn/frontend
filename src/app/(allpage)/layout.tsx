'use client'
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import Box from '@mui/material/Box';
import AppHeader from '@/app/components/AppHeader';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store' ;  // Import store
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AppInitializer from '@/app/components/AppInitializer';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Provider store={store}>
              {/* Chỉ là tạm thời để duy trì đăng nhập */}
            <AppInitializer/>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="colored"
            />

            <AppHeader/>
            <Box mt='53px'>
              {props.children}
            </Box>
            </Provider>,
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
