import { SessionProvider } from "../context/SessionContext";
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from "react-toastify";
const OrderLayout = (props: { children: React.ReactNode }
) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <SessionProvider>
            <ToastContainer/>
            {props.children}
            </SessionProvider>
            </ThemeProvider>
            </body>
        </html>
      
    )
}

export default OrderLayout;