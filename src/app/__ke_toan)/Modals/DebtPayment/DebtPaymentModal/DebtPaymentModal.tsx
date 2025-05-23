"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CDebtPaymentModal from "./CDebtPaymentModal";
import PaymentModal from "./PaymentModal/PaymentModal";
import DebtPaymentPopover from "../../_components/Popover/DebtPaymentPopover"

const DebtPaymentModal: React.FC<DebtPaymentModalProps> = ({ open, onClose, totalDebt, }) => {
  const [amount, setAmount] = React.useState<number | string>("");

  const handleConfirmPayment = () => {
    console.log("Số tiền thanh toán:", amount);
    onClose(); // Đóng modal sau khi thanh toán
  };

  const handleOpenCheckBox = () => {
    
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        width: "95%",
        height: "90%",
        bgcolor: "white",
        mx: "auto",
        mt: "35px",
        borderRadius: "10px",
        overflowY: 'auto'
      }}>
        {/* HeadModal */}
        <Box sx={{
          minHeight: "50px",
          bgcolor: "#8DB883",
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopRightRadius: "10px",
          borderTopLeftRadius: "10px",
          color: 'white',
          p: "0 20px",
          position: 'sticky',
          top: '0',
          zIndex: 1000,
        }}>
          <Typography sx={{
            fontSize: "20px",
            fontWeight: 'bold',
            textTransform: 'uppercase'            
          }}>Thanh toán công nợ</Typography>
          <IconButton sx={{ color: 'white' }} onClick={onClose}>
            <HorizontalRuleIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </Box>

        {/* BodyModal */}
        <Box p='20px 40px 0 40px'>
          <Box>
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 2,
            }}> <Box>
                <Typography fontWeight='bold'>Từ ngày</Typography>
                <TextField id="outlined-basic" placeholder="Chọn ngày" variant="outlined" disabled
                  sx={{ '& .MuiOutlinedInput-root': { height: 36, width: "100%"} }}
                />
              </Box>
              <Box>
                <Typography fontWeight='bold'>Đến ngày</Typography>
                <TextField id="outlined-basic" placeholder="Chọn ngày" variant="outlined" disabled
                  sx={{ '& .MuiOutlinedInput-root': { height: 36, width: "100%",} }}
                />
              </Box>
              <Box>
                <Typography fontWeight='bold'>Khách hàng</Typography>
                <TextField id="outlined-basic" placeholder="Nhập khách hàng..." variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { height: 36,  width: "100%" } }}
                />
              </Box>
              <Box>
                <Typography fontWeight='bold'>Nhân viên sale</Typography>
                <TextField id="outlined-basic" placeholder="Nhập nhân viên..." variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { height: 36,  width: "100%"} }}
                />
              </Box>
              <Button startIcon={<SearchIcon/>} sx={{
                bgcolor: "#8DB883",
                color: 'white',
                width: "140px",  
              }}>Tìm kiếm</Button>
            </Box>

            <Box mt='10px'>
              <Typography sx={{
                fontSize: "18px",
                fontWeight: "bold",
              }}>Tổng thanh toán còn lại: 25.000.000 VND</Typography>

              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {/* PaymentModal */}
              <PaymentModal/>
              {/* DebtPaymentPopover */}
              <DebtPaymentPopover/>
              </Box>
            </Box>
          </Box>

          {/* Cbody */}
           <CDebtPaymentModal/>
        </Box>
      </Box>
    </Modal>
  );
};

export default DebtPaymentModal;
