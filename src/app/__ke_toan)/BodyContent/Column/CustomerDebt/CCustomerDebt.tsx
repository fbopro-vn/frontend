'use client'
import * as React from 'react';
import Typography  from '@mui/material/Typography';
import  Box  from '@mui/material/Box';


const CCustomerDebt = () => {
  const [formattedRows, setFormattedRows] = React.useState<{ kh: string; tcn: string, nv: string; }[]>([]);

  React.useEffect(() => {
    // Chuyển đổi thanh toán sang dạng chuỗi có định dạng sau khi component được render trên client
    setFormattedRows(rows.map(row => ({
      kh: row.kh,
      tcn: row.tcn.toLocaleString(),
      nv: row.nv
    })));
  }, []);


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
      <Typography fontWeight="bold"> Tổng công nợ: 43,744,000 </Typography>
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
      <Typography fontWeight='bold' sx={{ flex: 1, textAlign: 'left' }}>Khách hàng</Typography>
      <Typography fontWeight='bold' sx={{ flex: 1, textAlign: 'center' }}>Tổng công nợ</Typography>
      <Typography fontWeight='bold' sx={{ flex: 1, textAlign: 'right' }}>Nhân viên</Typography>
      </Box>

      <Box sx={{ 
        mt: '10px',
        maxHeight: "430px", 
        borderRadius: "8px",
        overflowY: "auto" , 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'}}
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
            <Typography sx={{ flex: 1, textAlign: 'left' }}>{row.kh}</Typography>
            <Typography sx={{ flex: 1, textAlign: 'center' }}>{row.tcn}</Typography>
            <Typography sx={{ flex: 1, textAlign: 'right' }}>{row.nv}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const rows = [
    { kh: "Công ty A", tcn: 1000000, nv: "Nguyễn Văn A" },
    { kh: "Công ty B", tcn: 500000, nv: "Trần Thị B" },
    { kh: "Công ty C", tcn: 750000, nv: "Lê Văn C" },
    { kh: "Công ty D", tcn: 200000, nv: "Phạm Thị D" },
    { kh: "Công ty E", tcn: 600000, nv: "Đặng Văn E" },
    { kh: "Công ty F", tcn: 300000, nv: "Võ Thị F" },
    { kh: "Công ty G", tcn: 900000, nv: "Bùi Văn G" },
    { kh: "Công ty H", tcn: 1100000, nv: "Hoàng Thị H" },
    { kh: "Công ty I", tcn: 400000, nv: "Ngô Văn I" },
    { kh: "Công ty J", tcn: 850000, nv: "Phan Thị J" },
    { kh: "Công ty K", tcn: 700000, nv: "Lý Văn K" },
    { kh: "Công ty L", tcn: 1200000, nv: "Tống Thị L" },
  ];
  

export default CCustomerDebt;