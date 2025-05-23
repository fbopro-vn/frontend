'use client'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SelectMonth from "./SelectMonth"
import CMonthRevenue from "./CMonthRevenue"
import { useTheme } from '@mui/material/styles';



const MonthRevenue = () => {
    const theme = useTheme();

    return (
        <Box sx={theme.nhapchi.columnStyles}>
            {/* Header Column */}
            <Typography sx={theme.nhapchi.headColumnStyles}>Thu tiền tháng</Typography>
            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'space-between',
                alignItems: 'center',
                m: "15px",
                gap: 2,        
            }}>
            
            <SelectMonth/>  
            <Typography>Tổng chi tiêu: 5.700.000</Typography>
   
            </Box>
            {/* Body Column */}
            <Box sx={{
                p:'0 20px',
                mt: { xs: '60px', md: 0  },
            }}>
                <CMonthRevenue/>
            </Box>
    
        </Box>
    )
}

export default MonthRevenue