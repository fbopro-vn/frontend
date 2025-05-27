'use client'
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Typography } from "@mui/material";
import { useOrderContext } from "@/app/context/OrderContext"; // ✅ Import Context
import useUserData from "@/app/hooks/useUserData";

export default function SearchStaff() {
  const {
    updateOrderDate,
    getActiveOrderSeller,
    updateActiveOrderSeller,
    activeOrderId,
  } = useOrderContext();

  const { userData } = useUserData("http://api.sdc.com:8000/v1/users");

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  // ⏰ Cập nhật thời gian mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("vi-VN");
      const formattedDateTime = `${formattedTime} ${formattedDate}`;
      setCurrentTime(formattedDateTime);
      updateOrderDate(formattedDateTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [updateOrderDate]);

   useEffect(() => {
     const interval = setInterval(() => {
       const now = new Date();
       const formattedDate = now.toLocaleDateString("vi-VN", {
         day: "2-digit",
         month: "2-digit",
         year: "numeric",
       });
       const formattedTime = now.toLocaleTimeString("vi-VN");
       const formattedDateTime = `${formattedTime} ${formattedDate}`;
       setCurrentTime(formattedDateTime);
       updateOrderDate(formattedDateTime);
     }, 1000);
 
     return () => clearInterval(interval);
   }, [updateOrderDate]);

  const loginUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  // ✅ Khi đổi đơn hàng, gán lại inputValue và context seller nếu cần
  useEffect(() => {
    const activeSeller = getActiveOrderSeller();

    if (activeSeller?.fullname && activeSeller.fullname.trim() !== "") {
      setInputValue(activeSeller.fullname);
    } else if (loginUser?.fullname) {
      setInputValue(loginUser.fullname);
      updateActiveOrderSeller({
        id: loginUser.id,
        fullname: loginUser.fullname,
      });
    }
  }, [activeOrderId]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "5px solid #8DB883", // Viền bọc toàn bộ SALE + Input + Time
        borderRadius: "5px",
        padding: "5px",
        width: 520,
        height: 30,
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
          mt: "2px",
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
        onOpen={() => setOpen(true)} // ✅ Tự mở khi click vào input
        onClose={() => setOpen(false)}
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
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            onFocus={() => setOpen(true)}
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
