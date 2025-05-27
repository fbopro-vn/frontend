'use client'
import { useEffect, useState } from "react";
import { OrderProvider } from "../../context/OrderContext";
import { ProductProvider } from "../../context/ProductContext";
import { SessionProvider } from "../../context/SessionContext";
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from "react-toastify";
const OrderLayout = (props: { children: React.ReactNode }
) => {
     const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed?.id) {
            setUserId(parsed.id);
          }
        } catch (err) {
          console.error('❌ Lỗi khi parse user:', err);
        }
      }
    }
  }, []);
    return (
      
        
  
         <ThemeProvider theme={theme}>
                   <CssBaseline />
                   <SessionProvider userId={userId ?? ''}>
            <OrderProvider>
            <ProductProvider>
            <ToastContainer/>
            {props.children}
            </ProductProvider>
            </OrderProvider>
            </SessionProvider>
         </ThemeProvider>
    
      
    )
}

export default OrderLayout;