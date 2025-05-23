'use client';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import BodyExpense from '@/app/api/Accountant/BodyExpense.json'

const CMonthPay = () => {
  const selectedMonth = useSelector((state: RootState) => state.month.selectedMonth);

  // State để lưu dữ liệu đã được lọc theo tháng
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    // Lọc dữ liệu mỗi khi selectedMonth thay đổi
    const newFiltered = BodyExpense.filter((item) => {
      const itemMonth = item.date.split('/')[1]; // "03" -> tháng từ "dd/mm/yyyy"
      return itemMonth === selectedMonth.padStart(2, '0'); // Ví dụ "3" thành "03"
    });

    // Cập nhật lại filtered dữ liệu
    setFiltered(newFiltered);
  }, [selectedMonth]); // Lắng nghe thay đổi của selectedMonth trong Redux
  console.log("Data", filtered)
  return (
    <Box>
      {/* Head Table */}
      <Box sx={{
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
      }}>
        <Typography fontWeight='bold' sx={{ flex: 1, textAlign: 'left' }}>Sản phẩm</Typography>
        <Typography fontWeight='bold' sx={{ flex: 1, textAlign: 'right' }}>Tổng thành tiền</Typography>
      </Box>

      <Box sx={{
        mt: '10px',
        maxHeight: "430px",
        borderRadius: "8px",
        overflowY: "auto",
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
      }}>
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
            <Typography sx={{ flex: 1, textAlign: 'left' }}>{row.name}</Typography>
            <Typography sx={{ flex: 1, textAlign: 'right' }}>{row.thanh_toan.toLocaleString()}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// const rows = [
//   { name: "Sữa chua đông lạnh", tong_thanh_tien: 100000, provider: 'OM', date: "15/01/2025" },
//   { name: "Bánh sandwich kem", tong_thanh_tien: 500000, provider: 'AEON', date: "15/02/2025" },
//   { name: "Bánh su kem", tong_thanh_tien: 600000, provider: 'POE', date: "15/03/2025" },
//   { name: "Bánh cupcake", tong_thanh_tien: 200000, provider: 'INU', date: "15/04/2025" },
//   { name: "Bánh gừng", tong_thanh_tien: 100000, provider: 'Graves', date: "15/05/2025" },
//   { name: "Bánh phô mai", tong_thanh_tien: 800000, provider: 'Xayah', date: "15/06/2025" },
//   { name: "Bánh brownie", tong_thanh_tien: 400000, provider: 'Thresh', date: "15/07/2025" },
//   { name: "Bánh macaron", tong_thanh_tien: 300000, provider: 'Yone', date: "15/08/2025" },
//   { name: "Bánh tiramisu", tong_thanh_tien: 100000, provider: 'Tôn', date: "15/09/2025" },
//   { name: "Bánh churros", tong_thanh_tien: 900000, provider: 'ES', date: "15/10/2025" },
//   { name: "Bánh Kiwi", tong_thanh_tien: 100000, provider: 'Javascript', date: "15/11/2025" },
//   { name: "Bánh lạc", tong_thanh_tien: 100000, provider: 'RPE', date: "15/12/2025" }
// ];

export default CMonthPay;
