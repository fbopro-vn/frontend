"use client";
import React, {useState}  from "react";
import { Autocomplete, TextField,Modal, Box, Button, Typography, Checkbox } from "@mui/material";
import ModalAddPro from "./Modal/ModalAddPro";
import { useProductContext } from "@/app/context/ProductContext";
import useProductData from "@/app/hooks/useProductData";



export default function ComboBox() {
const [open, setOpen] = React.useState(false);
const [value, setValue] = useState(null); // Quản lý giá trị được chọn
const [inputValue, setInputValue] = useState(""); // Quản lý nội dung ô nhập

// Gọi custom hook
const { productData, error, isLoading } = useProductData("http://api.fbopro.vn/v1/products");
const handleAddProduct = (newProduct: Product) => {
  console.log("Sản phẩm mới đã được lưu", newProduct);
  // Không cập nhật state, chỉ nhận sự kiên và đống modal
}
const handleOpen = () => {
  console.log("Opening modal...");
  setOpen(true);
};
const handleClose = () => setOpen(false);

// Context
const { addProduct } = useProductContext();


  return (
    <>
    <Autocomplete
      disablePortal
      sx={{ width: 300, marginLeft: '80px', position: "relative" }}
      options={productData}
      getOptionLabel={(option) => option.name}
      value={value} // Giá trị được chọn
      inputValue={inputValue} // Điều khiển nội dung ô nhập
      onChange={(_, newValue) => {
        if (newValue) {
          addProduct({
            id: newValue.id,
            name: newValue.name,
            group: newValue.group,
            unit: newValue.unit,
            amount: 1,
            costPrice: newValue.costPrice,
            salePrice: newValue.salePrice,
            total_price: 0,
            stockQuantity: 0,
          });
          setValue(null); // Reset giá trị đã chọn
          setInputValue(""); // Reset nội dung nhập
        }
      }}
     // ✅ Ngăn hiển thị khi bấm vào
      open={!!inputValue} // ✅ Chỉ hiển thị popup khi có nhập ký tự
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue); // Cập nhật nội dung nhập
      }}
  
      renderInput={(params) => <TextField {...params} variant="outlined"
        placeholder="Tìm kiếm sản phẩm"
        sx={{
          width: "370px",
          '& .MuiInputBase-root': {
            height: 40, // Chiều cao của input
            bgcolor: "white"

          },
         // Chiều cao của input
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent', // Màu viền mặc định trong suốt
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent', // Màu viền khi hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent', // Màu viền khi focus (active)
            },
          },

        }}

      />}
      slotProps={{
        listbox: {
          sx: {
            minHeight: "400px", // Giữ chiều cao cố định
            maxHeight: "400px", // Đảm bảo không bị co lại
            overflowY: "auto",
            marginBottom: '55px',
            position: "relative",
          },
          component: (props) => (
            <Box {...props} position="relative">
              {props.children}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  // padding: "10px",
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  backgroundColor: "white",
                  boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
                  zIndex: 1500,
                }}
              >
                <Button fullWidth  sx={{
                  height: '50px',
                  bgcolor: "#8DB883",
                  border: "transparent",
                  color: "#fff",


                }}
                onClick={handleOpen}
                >+ Thêm Sản Phẩm</Button>
              </Box>
            </Box>
          ),
        },
      }}
      noOptionsText={  <NoOptionsMessage handleOpen={handleOpen}  isLoading={isLoading} />}
    />

    <ModalAddPro  open={open} handleClose={handleClose} onAddProduct={handleAddProduct}/>
      
      </>
  );
}


// ✅ Chỉnh sửa NoOptionsMessage đúng kích thước
const NoOptionsMessage = ({ handleOpen , isLoading}: { handleOpen: () => void, isLoading: boolean }) => (
  <Box
    sx={{
      minHeight: "130px", // Đảm bảo độ cao giống listbox khi có kết quả
      display: "flex",
      alignItems: "top",
      flexDirection: "column",
      position: "relative",
    }}
  >
    <Typography>{isLoading ? "Vui lòng chờ..." : "Không có kết quả!"}</Typography>

    {/* Giữ vị trí y như nút khi có kết quả */}
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1500,
      }}
    >
      <Button
        fullWidth
        sx={{
          height: "50px",
          bgcolor: "#8DB883",
          border: "transparent",
          color: "#fff",
        }}
        onClick={handleOpen}
      >
        + Thêm Sản Phẩm
      </Button>
    </Box>
  </Box>
);
