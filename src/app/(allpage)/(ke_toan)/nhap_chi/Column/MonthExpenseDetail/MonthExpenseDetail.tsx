'use client'

import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SelectMonth from "./SelectMonth"
import CMonthPay from "./CMonthExpenseDetail"
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import BodyExpense from '@/app/api/Accountant/BodyExpense.json'

const MonthPay = () => {
    const theme = useTheme();

    const [filtered, setFiltered] = useState<any[]>([]);
    const selectedMonth = useSelector((state: RootState) => state.month.selectedMonth);

    useEffect(() => {
        // Lọc dữ liệu mỗi khi selectedMonth thay đổi
        const newFiltered = BodyExpense.filter((item) => {
          const itemMonth = item.date.split('/')[1]; // "03"
          return itemMonth === selectedMonth.padStart(2, '0'); // Ví dụ "3" thành "03"
        });
    
        // Cập nhật lại filtered dữ liệu
        setFiltered(newFiltered);
      }, [selectedMonth]); // Lắng nghe thay đổi của selectedMonth trong Redux

    // Tính tổng thu tháng đó
    const monthPay = filtered.reduce((total, item) => total + item.thanh_toan, 0);
    
    return (
        <Box sx={theme.nhapchi.columnStyles}>
            {/* Header Column */}
            <Typography sx={theme.nhapchi.headColumnStyles}>Chi tiền tháng</Typography>
            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'space-between',
                alignItems: 'center',
                m: "15px",
                gap: 2,        
            }}>
            
            <SelectMonth/>  
            <Typography>Tổng chi tiêu: {monthPay.toLocaleString('vi-VN')} VND</Typography>
   
            </Box>
            {/* Body Column */}
            <Box sx={{
                p:'0 20px',
                mt: { xs: '60px', md: 0  },
            }}>
                <CMonthPay/>
            </Box>
    
        </Box>
    )
}

export default MonthPay