'use client'
import * as React from "react";
import Box from "@mui/material/Box";
import DebtPaymentButton from "./DebtPaymentButton";
import DebtPaymentModal from "../Modals/DebtPayment/DebtPaymentModal/DebtPaymentModal";
import SearchButton from "./SearchButton";
import SearchModal from "../Modals/Search/SearchModal/SearchModal";

const ButtonBar = () => {
    const [searchUpdateModalOpen, setSearchModalOpen] = React.useState(false);
    const [debtPaymentModalOpen, setDebtPaymentModalOpen] = React.useState(false);
    
    return (
        <Box sx={{
            minWidth: "500px",
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            p: "50px 50px 0 50px",
            gap: 20
        }}>
            <SearchButton openModal={() => setSearchModalOpen(true)} />
            {/* ✅ Thêm Modal vào */}
            <SearchModal
                open={searchUpdateModalOpen}
                onClose={() => setSearchModalOpen(false)}
                totalDebt={5000000}  // ✅ Giá trị mẫu, bạn có thể thay đổi
            />

            <DebtPaymentButton openModal={() => setDebtPaymentModalOpen(true)} />
            {/* ✅ Thêm Modal vào */}
            <DebtPaymentModal
                open={debtPaymentModalOpen}
                onClose={() => setDebtPaymentModalOpen(false)}
                totalDebt={5000000}  // ✅ Giá trị mẫu, bạn có thể thay đổi
            />
        </Box>
    )
}

export default ButtonBar;