'use client'
import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import BodyRevenue from '@/app/api/Accountant/BodyRevenue.json'
const CMonthRevenue = () => {
  const selectedMonth = useSelector((state: RootState) => state.month.selectedMonth);

   // State để lưu dữ liệu đã được lọc theo tháng
   const [filtered, setFiltered] = React.useState<any[]>([]);

    useEffect(() => {
     // Lọc dữ liệu mỗi khi selectedMonth thay đổi
     const newFiltered = BodyRevenue.filter((item) => {
       const itemMonth = item.date.split('/')[1]; // "03"
       return itemMonth === selectedMonth.padStart(2, '0'); // Ví dụ "3" thành "03"
     });
 
     // Cập nhật lại filtered dữ liệu
     setFiltered(newFiltered);
   }, [selectedMonth]); // Lắng nghe thay đổi của selectedMonth trong Redux

  return (
    <Box>
      {/* Head Table */}
      <Box
        sx={{
          height: '40px',
          bgcolor: "#8DB883",
          color: 'white',
          display: 'flex',
          justifyContent: "space-between",
          alignItems: 'center',
          p: '0 20px',
          borderRadius: "10px",
          border: "1px solid white",
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Typography fontWeight='bold'>Sản phẩm</Typography>
        <Typography fontWeight='bold'>Thanh toán</Typography>
      </Box>

      <Box
        sx={{
          mt: '10px',
          maxHeight: "430px",
          borderRadius: "8px",
          overflowY: "auto",
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
        }}
      >
        {filtered.map((row, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: "10px 20px",
              borderBottom: "1px solid #ddd",
              "&:nth-of-type(odd)": { bgcolor: "#f9f9f9" },
            }}
          >
            <Typography>{row.name}</Typography>
            <Typography>{row.thanh_toan.toLocaleString()}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};


export default CMonthRevenue;
