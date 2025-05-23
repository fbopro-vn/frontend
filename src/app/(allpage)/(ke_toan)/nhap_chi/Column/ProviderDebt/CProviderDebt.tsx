'use client'
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const CProviderDebt = () => {
  const [formattedRows, setFormattedRows] = useState<{ tcn: number, ncc: string; }[]>([]);

  useEffect(() => {
    // Chuyển đổi thanh toán sang dạng chuỗi có định dạng sau khi component được render trên client
    setFormattedRows(rows.map(row => ({
      tcn: row.tcn,
      ncc: row.ncc
    })));
  }, []);

  const providerDebt = formattedRows.reduce((total, item) => total + item.tcn, 0)

  return (
    <Box>
      {/* Head Table */}

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
        <Typography fontWeight="bold"> Tổng công nợ: {providerDebt.toLocaleString('vi-VN')} VND</Typography>
      </Box>

      <Box sx={{
        height: '40px',
        bgcolor: "#8DB883",
        color: 'white',
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        p: '0 20px',
        border: "1px solid white",
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      }}
      >
        <Typography fontWeight='bold' sx={{ flex: 1, textAlign: 'left' }}>Nhà cung cấp</Typography>
        <Typography fontWeight='bold' sx={{ flex: 1, textAlign: 'right' }}>Tổng công nợ</Typography>
      </Box>

      <Box sx={{
        mt: '10px',
        maxHeight: "430px",
        borderRadius: "8px",
        overflowY: "auto",
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
      }}
      >
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
            <Typography sx={{ flex: 1, textAlign: 'left' }}>{row.ncc}</Typography>
            <Typography sx={{ flex: 1, textAlign: 'right' }}>{row.tcn.toLocaleString('vi-VN')}</Typography>

          </Box>
        ))}
      </Box>
    </Box>
  );
}

const rows = [
  { tcn: 1000000, ncc: "Nguyễn Văn A" },
  { tcn: 500000, ncc: "Trần Thị B" },
  { tcn: 750000, ncc: "Lê Văn C" },
  { tcn: 200000, ncc: "Phạm Thị D" },
  { tcn: 600000, ncc: "Đặng Văn E" },
  { tcn: 300000, ncc: "Võ Thị F" },
  { tcn: 900000, ncc: "Bùi Văn G" },
  { tcn: 1100000, ncc: "Hoàng Thị H" },
  { tcn: 400000, ncc: "Ngô Văn I" },
  { tcn: 850000, ncc: "Phan Thị J" },
  { tcn: 700000, ncc: "Lý Văn K" },
  { tcn: 1200000, ncc: "Tống Thị L" },
];


export default CProviderDebt;