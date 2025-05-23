import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SearchModal from "./Modals/Search/SearchModal"
import DebtPaymentModal from "./Modals/DebtPayment/DebtPaymentModal/DebtPaymentModal"
import Column from "./Column/Column";
import SpecificTable from "./SpecificTable/SpecificTable";
import Container from "@mui/material/Container";
import Divider  from "@mui/material/Divider";

const IncomeManagement = () => {
    return (
        <Container maxWidth='xl' disableGutters>
        {/* Button Modal */}
            <Box sx={{
                minWidth: "500px",
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                p: "50px 50px 0 50px",
                gap: 5
            }}>
                {/* ✅ Thêm Modal vào */}
                <SearchModal/>
                <DebtPaymentModal/>
            </Box>

            <Box sx={{
                px: '20px'
            }}>
                <Column/>
                <Divider sx={{ 
                    width: '80%',
                    mx: 'auto',
                    borderBottomWidth: '5px',
                    borderRadius: '10px',
                    borderColor: "#8DB883" }}/>
                <SpecificTable/>
            </Box>
        </Container>
    )
}

export default IncomeManagement