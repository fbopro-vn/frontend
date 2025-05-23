'use client'
import React from "react";
import { Box, TextField, Typography, Button, Paper, Select, MenuItem, Switch, FormControl, InputLabel, Divider } from "@mui/material";
import { useOrderContext } from "@/app/context/OrderContext";
import { SelectChangeEvent } from "@mui/material"; // ✅ Import kiểu đúng

const UnderTable = () => {
  const { getTotalMoney, getActiveOrderDeposit, getTotalPriceProduct, getVatPrice, getActiveOrderVat, updateOrderField, isCheckoutMode } = useOrderContext();
  
  // Tiền khách đã trả
  const paidPayment = getActiveOrderDeposit()
  const customerMustPay = getTotalMoney() - paidPayment;
  return (
    <Box
      sx={{
        width: "1100px",
        minHeight: "260px",
        mt: "10px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "end"
      }}
    >
      <Box width={"50%"} height={"100%"} mr={18}>

        {/* Tổng tiền hàng */}
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
          <Typography fontSize={"18px"} fontWeight={"bold"}>Tổng tiền hàng :</Typography>
          <Typography fontSize={"18px"} fontWeight={"bold"}>
            {getTotalPriceProduct().toLocaleString()} VND
          </Typography>
        </Box>

        {/* VAT */}
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
          <Box display="flex" alignItems="center">
            <Typography fontSize={"18px"} fontWeight={"bold"}>VAT :</Typography>
            <Select
              sx={{
                width: "80px",
                height: "40px",
                fontSize: "16px",
                ml: 2,
                "& .MuiSelect-select": {
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                },
              }}
              value={String(getActiveOrderVat())}
              onChange={(event) => updateOrderField("vat", Number(event.target.value) || 0)}
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={8}>8%</MenuItem>
              <MenuItem value={10}>10%</MenuItem>
            </Select>
          </Box>
          <Box display="flex" alignItems="center">

            <Typography fontSize={"18px"} fontWeight={"bold"} ml={2}>
              {getVatPrice().toLocaleString()} VND
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} /> {/* Đường phân cách */}

        {/* Nếu đang ở trạng thái Thanh Toán */}
        {isCheckoutMode ? (
          <>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
              <Typography fontSize={"18px"} fontWeight={"bold"} color={"#2E7D32"}>Khách hàng đã trả :</Typography>
              <Typography fontSize={"18px"} fontWeight={"bold"} color={"#2E7D32"}>
                {getActiveOrderDeposit().toLocaleString()} VND
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography fontSize={"18px"} fontWeight={"bold"} color={"#D32F2F"}>Khách hàng phải trả :</Typography>
              <Typography fontSize={"18px"} fontWeight={"bold"} color={"#D32F2F"}>
                {customerMustPay.toLocaleString('vi-VN')} VND
              </Typography>
            </Box>
          </>
        ) : (
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography fontSize={"18px"} fontWeight={"bold"}>Khách hàng trả :</Typography>
            <Typography fontSize={"18px"} fontWeight={"bold"}>
              {getTotalMoney().toLocaleString()} VND
            </Typography>
          </Box>
        )}

      </Box>
    </Box>
  )
}

export default UnderTable;

