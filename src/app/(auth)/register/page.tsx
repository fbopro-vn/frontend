import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Đăng ký
        </Typography>
        <TextField
          label="Họ tên"
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          size="small"
          type="email"
        />
        <TextField
          label="Mật khẩu"
          fullWidth
          margin="normal"
          size="small"
          type="password"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Tạo tài khoản
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Đã có tài khoản?{" "}
          <Link href="/dang_nhap" passHref>
            <span style={{ color: "#1976d2", cursor: "pointer" }}>Đăng nhập</span>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
