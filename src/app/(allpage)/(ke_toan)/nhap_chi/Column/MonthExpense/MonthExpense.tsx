'use client'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CMonthExpense from "./CMonthExpense"
import { useTheme } from '@mui/material/styles';

const MonthExpense = () => {
    const theme = useTheme();

    return (
        <Box sx={theme.nhapchi.columnStyles}>
            {/* Header Column */}
            <Typography sx={theme.nhapchi.headColumnStyles}>Chi tiền các tháng</Typography>
            {/* Body Column */}
            <Box p='0 20px'>
                <CMonthExpense/>
            </Box>
        </Box>
    )
}

export default MonthExpense