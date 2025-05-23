'use client'
import * as React from 'react';
import Typography  from '@mui/material/Typography';
import  Box  from '@mui/material/Box';


const CMonthRevenue = () => {
  const [formattedRows, setFormattedRows] = React.useState<{ name: string; thanh_toan: string }[]>([]);

  React.useEffect(() => {
    // Chuyển đổi thanh toán sang dạng chuỗi có định dạng sau khi component được render trên client
    setFormattedRows(rows.map(row => ({
      name: row.name,
      thanh_toan: row.thanh_toan.toLocaleString()
    })));
  }, []);


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
      }}
      >
      <Typography fontWeight='bold'>Sản phẩm</Typography>
      <Typography fontWeight='bold'>Thanh toán</Typography>
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
            <Typography>{row.name}</Typography>
            <Typography>{row.thanh_toan}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const rows = [
  { name: "Sữa chua đông lạnh", thanh_toan: 100000 },
  { name: "Bánh sandwich kem", thanh_toan: 500000 },
  { name: "Bánh su kem", thanh_toan: 600000 },
  { name: "Bánh cupcake", thanh_toan: 200000 },
  { name: "Bánh gừng", thanh_toan: 100000 },
  { name: "Bánh phô mai", thanh_toan: 800000 },
  { name: "Bánh brownie", thanh_toan: 400000 },
  { name: "Bánh macaron", thanh_toan: 300000 },
  { name: "Bánh tiramisu", thanh_toan: 100000 },
  { name: "Bánh churros", thanh_toan: 900000 },
  { name: "Bánh Kiwi", thanh_toan: 100000 },
  { name: "Bánh lạc", thanh_toan: 100000 }
];

export default CMonthRevenue;