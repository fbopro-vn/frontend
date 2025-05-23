import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography } from "@mui/material";
import { useOrderContext } from "@/app/context/OrderContext"; // ✅ Import Context
import useUserData from "@/app/hooks/useUserData";


export default function SearchStaff() {
  const { orders, updateOrderDate, getActiveOrderSeller, updateActiveOrderSeller, activeOrderId } = useOrderContext(); // ✅ Lấy hàm cập nhật thời gian từ Context
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString()); // State lưu thời gian
  const [inputValue, setInputValue] = useState(""); // Giữ nội dung nhập
  const [open, setOpen] = useState(false);

  const { userData, error, isLoading } = useUserData("http://api.sdc.com:8000/v1/users",);
  // ✅ Cập nhật thời gian real-time mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Format ngày tháng theo chuẩn "DD/MM/YYYY HH:mm:ss"
      const formattedDate = now.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });

      const formattedTime = now.toLocaleTimeString("vi-VN");

      const formattedDateTime = `${formattedTime} ${formattedDate}`;

      setCurrentTime(formattedDateTime); // ✅ Cập nhật state hiển thị thời gian
      updateOrderDate(formattedDateTime); // ✅ Cập nhật vào OrderContext
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [updateOrderDate]); // 🔹 Chỉ re-run khi `updateOrderDate` thay đổi

  // ✅ 2. Cập nhật `seller` khi chuyển tab
  useEffect(() => {
    const activeSeller = getActiveOrderSeller();
    // console.log("📌 Chuyển tab - Lấy seller mới:", activeseller);

    // Kiểm tra nếu giá trị hiển thị không đúng thì cập nhật lại
    if (activeSeller?.fullname !== inputValue) {
      setInputValue(activeSeller?.fullname || "");
    }

    setOpen(false); // Đóng popup khi chuyển tab
  }, [activeOrderId]); // 🔥 Chỉ chạy khi đổi tab



  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "5px solid #8DB883", // Viền bọc toàn bộ SALE + Input + Time
        borderRadius: "5px",
        padding: "5px",
        width: 520,
        height: 30
      }}
    >
      {/* SALE Text */}
      <Typography
        variant="body1"
        sx={{
          color: "black",
          fontWeight: "bold",
          marginRight: "10px",
          whiteSpace: "nowrap",
          mt: "2px"
        }}
      >
        SALE:
      </Typography>

      {/* Input Field */}
      <Autocomplete
        key={activeOrderId} // 🔥 Ép buộc Autocomplete re-render khi đổi tab
        options={userData}
        getOptionLabel={(option) => option.fullname} // Hiển thị fullname thay vì name
        open={open}
        value={userData.find((s) => s.fullname === inputValue) || null} // Đảm bảo luôn hiển thị đúng seller
        inputValue={inputValue}
        onInputChange={(_, newValue) => {
          setInputValue(newValue);
          setOpen(!!newValue); // Mở popup khi có ký tự nhập vào
        }}
        onChange={(_, newValue) => {
          if (newValue) {
            setInputValue(newValue.fullname); // Cập nhật hiển thị input bằng fullname
            updateActiveOrderSeller(newValue); // Cập nhật vào OrderContext
          }
          setOpen(false); // Đóng popup ngay sau khi chọn
        }}
        sx={{ flexGrow: 2.5 }} // Input tự động căn chỉnh để không tràn qua TIME
        slotProps={{
          popper: {
            sx: {
              width: "400px !important",
              maxWidth: "none",
            }
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              "& .MuiInputBase-root": {
                height: 30,
                paddingRight: "0px !important", // Loại bỏ padding phải
              },
              "& .MuiOutlinedInput-root": {
                paddingRight: "0px !important", // Xóa padding phải của OutlinedInput
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent", // Màu viền mặc định trong suốt
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent", // Màu viền khi hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent", // Màu viền khi focus (active)
                },
              },
              "& .MuiAutocomplete-inputRoot": {
                paddingRight: "0px !important", // Loại bỏ padding phải của Autocomplete input
              },
            }}
          />
        )}
      />


      {/* TIME Text */}
      <Typography
        variant="body1"
        sx={{
          color: "black",
          marginLeft: "10px",
          whiteSpace: "nowrap", // Đảm bảo thời gian không bị xuống dòng
        }}
      >
        {currentTime}
      </Typography>
    </Box>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
