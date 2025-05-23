import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import LogoC from '../../../../public/assets/logo_sdc.png'
import Image from "next/image";
import BodyDetailOrder from "@/app/api/BodyDetailOrder.json"
import removeVietnameseTones from "@/app/utils/removeVietnameseTones";
import DateFill from '@/app/components/Datetime/DateFill';
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

const DetailOrderSidebar = ({ onFilter }: { onFilter: (data: typeof BodyDetailOrder) => void }) => {
  const [searchOrderId, setSearchOrderId] = useState("");  // Nhập mã đặt hàng
  const [searchCustomer, setSearchCustomer] = useState(""); // Nhập tên khách hàng

  const [inputValueCustomer, setInputValueCustomer] = useState(""); // Quản lý nội dung ô nhập
  const [openAutoCompleteCustomer, setOpenAutoCompleteCustomer] = useState(false);

  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  // Định nghĩa thay đổi ngày từ DateFill
  // ✅ Khi thay đổi ngày từ DateFill
  const handleDateChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
    applyFilters(); // Cập nhật bộ lọc khi thay đổi ngày
  };


  const applyFilters = () => {
    if (!BodyDetailOrder || BodyDetailOrder.length === 0) return;

    const lowerCaseOrderId = removeVietnameseTones(searchOrderId.trim().toLowerCase());
    const lowerCaseCustomer = removeVietnameseTones(searchCustomer.trim().toLowerCase());

    const filteredOrders = BodyDetailOrder.filter(order => {
      const orderDate = dayjs(order.date, "D/M/YYYY");
      // ✅ Lọc theo mã đơn hàng
      const matchesOrderId = lowerCaseOrderId ? removeVietnameseTones(order.order_id.toLowerCase()).includes(lowerCaseOrderId) : true;

      // ✅ Lọc theo tên khách hàng (fulltext-search)
      const matchesCustomer = lowerCaseCustomer
        ? lowerCaseCustomer.split(" ").every(term => removeVietnameseTones(order.customer.toLowerCase()).includes(term))
        : true;

      const start = dateRange.startDate ? dayjs(dateRange.startDate, "DD/MM/YYYY") : null;
      const end = dateRange.endDate ? dayjs(dateRange.endDate, "DD/MM/YYYY") : null

      // ✅ Lọc theo khoảng thời gian
      const matchesDate =
        (!start || orderDate.isAfter(start.subtract(1, "day"))) &&
        (!end || orderDate.isBefore(end.add(1, "day")));


      return matchesOrderId && matchesCustomer && matchesDate
    });

    onFilter(filteredOrders);
  };

  // Reset Form
  const restForm = () => {
    setSearchOrderId("")
    setSearchCustomer("")
    setDateRange({ startDate: "", endDate: "" })
  }
  useEffect(() => {
    applyFilters();
  }, [searchOrderId, searchCustomer, dateRange]);
  return (
    <Box
      sx={{
        width: "100%",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          src={LogoC}
          height={100}
          width={100}
          alt="LogoC" />
      </Box>

      <Box sx={{
        mx: '20px',
        flexDirection: 'column',
      }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography sx={{ fontWeight: 'bold' }}>Tìm kiếm</Typography>
          <IconButton onClick={restForm}>
            <ViewDayOutlinedIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          placeholder="Nhập mã đơn hàng"
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
          value={searchOrderId}
          onChange={(e) => setSearchOrderId(e.target.value)}
        />

        {/* Gợi ý */}
        <Autocomplete
          open={openAutoCompleteCustomer}
          onOpen={() => {
            if (inputValueCustomer) setOpenAutoCompleteCustomer(true);
          }}

          options={Array.from(
            new Set(BodyDetailOrder.map(item => item.customer))
          )} // 🔹 options là mảng string
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
            setOpenAutoCompleteCustomer(!!newInputValue); // ✅ mở popup khi có ký tự
          }}
          value={searchCustomer}
          onChange={(_, newValue) => {
            if (typeof newValue === "string") {
              setSearchCustomer(newValue);
              setInputValueCustomer(newValue);
              setOpenAutoCompleteCustomer(false); // ✅ đóng popup sau khi chọn
            }
          }}

          // ✅ Chỉ hiển thị popup khi có ký tự nhập vào

          renderInput={(params) =>
            <TextField {...params} placeholder='Nhập tên khách hàng'
              sx={{
                mb: 2.5,
                '& .MuiInputBase-root': {
                  borderRadius: "10px",
                  height: 40,

                  "& .MuiAutocomplete-endAdornment": { display: "none" } // Chiều cao của input
                },
                "& input::placeholder": {
                  fontSize: 14,
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
                  }
                }
              }}
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
            />
          }
          noOptionsText={"Không tìm thấy kết quả!"}
        />

      </Box>

      <Box sx={{
        mx: '20px',
      }}>
        <Typography sx={{ fontWeight: 'bold' }}>
          Lọc Theo Thời Gian
        </Typography>

        {/* 2 Textfile LỌc thời gian */}
        <DateFill 
          onDateChange={handleDateChange}
          dateRange={dateRange}
           />
      </Box>

    </Box>
  );
};

export default DetailOrderSidebar;
