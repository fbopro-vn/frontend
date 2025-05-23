import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import LogoC from '../../../../public/assets/logo_sdc.png';
import Image from "next/image";
import removeVietnameseTones from "@/app/utils/removeVietnameseTones";
import IconButton from "@mui/material/IconButton";
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

const CustomerSidebar = ({ data, onFilter }: { data: any[], onFilter: (data: any[]) => void }) => {
  const [searchCustomerId, setSearchCustomerId] = useState("");  // Nhập mã khách hàng
  const [searchCustomer, setSearchCustomer] = useState(""); // Nhập tên khách hàng

  const [inputValueCustomer, setInputValueCustomer] = useState(""); // Quản lý nội dung ô nhập
  const [openAutoCompleteCustomer, setOpenAutoCompleteCustomer] = useState(false);

  const applyFilters = () => {
    if (!data || data.length === 0) return;

    const lowerCaseCustomerId = removeVietnameseTones(searchCustomerId.trim().toLowerCase());
    const lowerCaseCustomer = removeVietnameseTones(searchCustomer.trim().toLowerCase());

    const filteredCustomers = data.filter(customer => {
      // ✅ Lọc theo mã đơn hàng và tên khách hàng
      const matchesCustomerId = lowerCaseCustomerId ? removeVietnameseTones(customer.customer_id.toLowerCase()).includes(lowerCaseCustomerId) : true;
      const matchesCustomer = lowerCaseCustomer ? removeVietnameseTones(customer.customer.toLowerCase()).includes(lowerCaseCustomer) : true;

      return matchesCustomerId && matchesCustomer;
    });

    onFilter(filteredCustomers); // Truyền dữ liệu đã lọc về component cha
  };

  // Reset form tìm kiếm
  const resetForm = () => {
    setSearchCustomerId("");
    setSearchCustomer("");
  };

  // Sử dụng useEffect để gọi applyFilters khi dữ liệu thay đổi
  useEffect(() => {
    applyFilters(); // Mỗi khi `searchCustomerId` hoặc `searchCustomer` thay đổi, sẽ gọi lại hàm lọc
  }, [searchCustomerId, searchCustomer, data]);

  return (
    <Box sx={{ width: "100%", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image src={LogoC} height={100} width={100} alt="LogoC" />
      </Box>

      <Box sx={{ mx: '20px', flexDirection: 'column' }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography sx={{ fontWeight: 'bold' }}>Tìm kiếm</Typography>
          <IconButton onClick={resetForm}>
            <ViewDayOutlinedIcon />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          placeholder="Nhập mã khách hàng"
          sx={{
            mb: 2.5,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              height: "40px",
            },
            "& input::placeholder": {
              fontSize: 14,
            },
          }}
          value={searchCustomerId}
          onChange={(e) => setSearchCustomerId(e.target.value)} // Cập nhật mã khách hàng
        />

        {/* Autocomplete tìm kiếm tên khách hàng */}
        <Autocomplete
          open={openAutoCompleteCustomer}
          onOpen={() => setOpenAutoCompleteCustomer(true)}
          options={Array.from(new Set(data.map(item => item.customer)))}  // Đảm bảo loại bỏ trùng lặp
          filterOptions={(options, { inputValue }) => {
            const query = removeVietnameseTones(inputValue.toLowerCase());
            return options.filter((option) =>
              removeVietnameseTones(option.toLowerCase()).includes(query)
            );
          }}
          onClose={() => setOpenAutoCompleteCustomer(false)}
          inputValue={inputValueCustomer}
          onInputChange={(_, newInputValue) => {
            setInputValueCustomer(newInputValue);
            setOpenAutoCompleteCustomer(!!newInputValue); // Mở popup khi có nhập ký tự
          }}
          value={searchCustomer}
          onChange={(_, newValue) => {
            if (typeof newValue === "string") {
              setSearchCustomer(newValue);
              setInputValueCustomer(newValue);
              setOpenAutoCompleteCustomer(false); // Đóng popup sau khi chọn
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Nhập tên khách hàng'
              sx={{
                mb: 2.5,
                '& .MuiInputBase-root': {
                  borderRadius: "10px",
                  height: 40,
                  "& .MuiAutocomplete-endAdornment": { display: "none" }
                },
                "& input::placeholder": {
                  fontSize: 14,
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'default', // Màu mặc định của border
                  },
                  '&:hover fieldset': {
                    borderColor: '#8DB883', // Khi hover, border sẽ đổi màu
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8DB883', // Khi active (focused), border sẽ đổi màu
                  }
                }
              }}
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)} // Cập nhật tên khách hàng
            />
          )}
          noOptionsText={"Không tìm thấy kết quả!"}
        />
      </Box>
    </Box>
  );
};

export default CustomerSidebar;
