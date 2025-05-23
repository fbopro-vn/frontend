import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import SearchModal from "./Modals/Search/SearchModal"
import DebtPaymentModal from "./Modals/DebtPayment/DebtPaymentModal/DebtPaymentModal"
import Column from "./Column/Column";
import SpecificTable from "./SpecificTable/SpecificTable";
import Container from "@mui/material/Container";
import ExpenseModal from "./Modals/Expense/ExpenseModal";

const ExpenseManagement = () => {
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
                <ExpenseModal/>
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

export default ExpenseManagement