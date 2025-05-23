"use client";
import React, {useState}  from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, IconButton } from "@mui/material";
import ModalAddCustomer from './Modal/ModalAddCustomer';
import useCustomerData from '@/app/hooks/useCustomerData';
import removeVietnameseTones from "@/app/utils/removeVietnameseTones"; 


interface propsCustomer {
  onSelectCustomer?: (customer: Customer | null) => void;
}

export default function SearchCustomer({ onSelectCustomer } : propsCustomer) {
// gửi đi
// Gọi custom hook
const { customerData, error, isLoading } = useCustomerData("http://api.sdc.com:8000/v1/customers");

  const [value, setValue] = useState<Customer | null>(null); // Giá trị nhập vào ô input
  const [inputValue, setInputValue] = useState(""); // Quản lý nội dung ô nhập
  // const [onSelectCustomer, setSelectCustomer] = useState(null);

  const handleAddCustomer = (newCustomer: Customer) => {
    console.log("Khách hàng mới đã được lưu", newCustomer);

    // Cập nhật khách hàng đã chọn vào Autocomplete
    setValue(newCustomer);

    // Gửi khách hàng mới lên `CustomerForm`
    if (onSelectCustomer) {
        onSelectCustomer(newCustomer);
    }
};

  return (
    <Autocomplete
      options={customerData} 
      getOptionLabel={(option) => option.name}
      filterOptions={(options, { inputValue }) => {
        const query = removeVietnameseTones(inputValue.toLowerCase());
        return options.filter((option) =>
          removeVietnameseTones(option.name.toLowerCase()).includes(query)
        );
      }}
      sx={{ height: '30px',width: 520 }}
      noOptionsText={isLoading ? "Vui lòng chờ..." : "Không có kết quả!"}
      value={value} // 🔹 Lưu khách hàng được chọn
      inputValue={inputValue} // 🔹 Hiển thị input đúng theo khách hàng
      

  
      // ✅ Cập nhật giá trị input khi gõ tìm kiếm
      onInputChange={(_, newInputValue) => {
        setValue(null); // Reset giá trị đã chọn
        setInputValue(newInputValue);
      }}
  
      // ✅ Khi chọn khách hàng
    onChange={(_, newValue) => {
    setValue(newValue); // Lưu khách hàng đã chọn
    setInputValue(""); // Hiển thị tên khách hàng vào input
    if (onSelectCustomer) {
      onSelectCustomer(newValue); // Gửi dữ liệu ra ngoài component cha
    }
  }}

      // ✅ Chỉ hiển thị popup khi có ký tự nhập vào
      open={!!inputValue}
      renderInput={(params) => 
        <Box style={{ width: "100%"}}>
      <TextField {...params} placeholder='Nhập tên hoặc số điện thoại khách hàng...'
       sx={{
        '& .MuiInputBase-root': {
        height: 30,
         position: "relative",
        "& .MuiAutocomplete-endAdornment": { display: "none" } // Chiều cao của input
        },
        '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'default', // Màu mặc định của border
      },
      '&:hover fieldset': {
        borderColor: '#8DB883', // Khi hover, border sẽ đổi màu đỏ
      },
      '&.Mui-focused fieldset': {
        borderColor: '#8DB883', // Khi active (focused), border sẽ đổi màu vàng
      }}
    }} 
    />
    {/* Lỗi chồng lên nhau fix thân thế của nó */}
          <Box
        
            sx={{
              position: "absolute",
              top:"72px",
              right:"28px"

            }}
          >
           <ModalAddCustomer onAddCustomer={handleAddCustomer}/>
          </Box>
    </Box>

    } 
    />
    
  );
}

