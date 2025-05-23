'use client'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useTheme } from '@mui/material/styles';
import CProviderDebt from "./CProviderDebt"

const ProviderDebt = () => {
    const theme = useTheme()

    return (
        <Box sx={theme.nhapchi.columnStyles}>
            {/* Header Column */}
            <Typography sx={theme.nhapchi.headColumnStyles}>Công nợ nhà cung cấp</Typography>
              {/* Body Column */}
              <Box p='0 20px'>
                <CProviderDebt/>
            </Box>
        </Box>
    )
}

export default ProviderDebt