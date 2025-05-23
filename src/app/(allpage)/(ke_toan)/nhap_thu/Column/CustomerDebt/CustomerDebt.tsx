'use client'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useTheme } from '@mui/material/styles';
import CCustomerDebt from "./CCustomerDebt"

const CustomerDebt = () => {
    const theme = useTheme()

    return (
        <Box sx={theme.nhapchi.columnStyles}>
            {/* Header Column */}
            <Typography sx={theme.nhapchi.headColumnStyles}>Công nợ khách hàng</Typography>
              {/* Body Column */}
              <Box p='0 20px'>
                <CCustomerDebt/>
            </Box>
        </Box>
    )
}

export default CustomerDebt