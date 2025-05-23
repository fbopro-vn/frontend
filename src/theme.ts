'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const COLUMN_STYLES = {
  width: "450px",
  height: "600px",
  border: "2px solid #8DB883",
  borderRadius: "10px"
}

const HEAD_COLUMN_STYLES = {
  mt: '4px',
  display: 'flex',
  justifyContent: 'center',
  fontSize: "18px",
  fontWeight: 700,
  textTransform: "uppercase"
}


// 🟢 Định nghĩa kiểu mở rộng
declare module '@mui/material/styles' {
  interface Theme {
    nhapchi: {
      columnStyles: object;
      headColumnStyles: object;
    };
  }
  interface ThemeOptions {
    nhapchi?: {
      columnStyles: object;
      headColumnStyles: object;
    };
  }
}

const theme = createTheme({
  nhapchi: {
    columnStyles: COLUMN_STYLES,
    headColumnStyles: HEAD_COLUMN_STYLES,
  },
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#8DB883"
    }
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            },
          ],
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined", // Mặc định tất cả TextField sẽ là outlined
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8DB883", // Khi hover, border chuyển sang đỏ
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8DB883", // Khi focus (active), border chuyển sang vàng
          },
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiAutocomplete-endAdornment": {
            display: "none", // Ẩn nút xóa (clear) và dropdown icon
          },
        },
      }
    }
  },
});


export default theme;
