import Box from "@mui/material/Box";
import MonthRevenue from "./Column/MonthRevenue/MonthRevenue";
import MonthExpense from "./Column/MonthExpense/MonthExpense";
import CustomerDebt from "./Column/CustomerDebt/CustomerDebt";
import SpecificTable from "./SpecificTable/SpecificTable";

const BodyContent = () => {
    return (
        <Box sx={{ mt: '40px' }}>
            <Box sx={{
                display: 'flex',
                justifyContent: "center",
                gap: 4,
            }}>
                <MonthRevenue/>
                <CustomerDebt/>
                <MonthExpense/>
            
               
            </Box>
            <SpecificTable/>
        </Box>
    )
}

export default BodyContent;