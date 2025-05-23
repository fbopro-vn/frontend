import { OrderProvider } from "../../context/OrderContext";
import { ProductProvider } from "../../context/ProductContext";
import { SessionProvider } from "../../context/SessionContext";
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from "react-toastify";
const OrderLayout = (props: { children: React.ReactNode }
) => {
    return (
      
        
  
         <ThemeProvider theme={theme}>
                   <CssBaseline />
                   <SessionProvider>
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