import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CMonthExpense = () => {
  const [formattedRows, setFormattedRows] = useState<{ thang: string; so_tien: number }[]>([]);

  useEffect(() => {
    // Chuyển đổi thanh toán sang dạng chuỗi có định dạng sau khi component được render trên client
    setFormattedRows(rows.map(row => ({
      thang: row.thang,
      so_tien: row.so_tien
    })));
  }, []);

  const monthExpense = formattedRows.reduce((total, item) => total + item.so_tien, 0)

  return (
    <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
    {/* Tổng Chi Tiền */}
    <Box
      sx={{
        mt: 3,
        height: "40px",
        bgcolor: "#8DB883",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",       
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        border: "1px solid white",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      }}
      >
      <Typography fontWeight="bold"> Tổng chi tiền: {monthExpense.toLocaleString('vi-VN')} VND</Typography>
    </Box>
    {/* Bảng Tháng - Số Tiền */}
    <Box
      sx={{
        height: '40px',
        bgcolor: "#8DB883",
        color: 'white',
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        p: '0 20px',
        border: "1px solid white",
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      }}>
      <Typography fontWeight="bold">
        Tháng
      </Typography>
      <Typography fontWeight="bold">
        Số Tiền
      </Typography>
    </Box>
    
    <Box>
      {/* Body */}
      <Box sx={{ 
        mt: '10px',
        maxHeight: "430px", 
        borderRadius: "8px",
        overflowY: "auto" , 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'}}>
        {formattedRows.map((row, index) => (
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
            <Typography>{row.thang}</Typography>
            <Typography>{row.so_tien.toLocaleString('vi-VN')}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
  )
}



const rows = [
  { "thang": "01/25", "so_tien": 3744000 },
  { "thang": "02/25", "so_tien": 1500000 },
  { "thang": "03/25", "so_tien": 2000000 },
  { "thang": "04/25", "so_tien": 1000000 },
  { "thang": "05/25", "so_tien": 3744000 },
  { "thang": "06/25", "so_tien": 1500000 },
  { "thang": "07/25", "so_tien": 2000000 },
  { "thang": "08/25", "so_tien": 1000000 },
  { "thang": "09/25", "so_tien": 3744000 },
  { "thang": "10/25", "so_tien": 1500000 },
  { "thang": "11/25", "so_tien": 2000000 },
  { "thang": "12/25", "so_tien": 1000000 }
]


export default CMonthExpense