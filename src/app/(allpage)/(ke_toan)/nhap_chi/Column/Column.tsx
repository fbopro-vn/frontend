import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MonthPay from "./MonthExpenseDetail/MonthExpenseDetail";
import MonthExpense from "./MonthExpense/MonthExpense";
import CustomerDebt from "./ProviderDebt/ProviderDebt";

const Column = () => {
  return (
    <Box mb='60px'>
      {/* Title */}
      <Box display="flex" justifyContent="center">
        <Typography
          sx={{
            mt: "40px",
            fontSize: "26px",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Báo cáo tổng hợp
        </Typography>
      </Box>

      {/* Content */}
      <Box display="flex" justifyContent="center" gap={4}>
        <MonthPay />
        <CustomerDebt />
        <MonthExpense />
      </Box>
    </Box>
  );
};

export default Column;
