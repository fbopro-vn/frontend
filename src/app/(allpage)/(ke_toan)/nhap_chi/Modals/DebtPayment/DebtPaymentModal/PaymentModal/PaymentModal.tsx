'use client'
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { NumericFormat } from 'react-number-format';
import Modal from '@mui/material/Modal'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import CPaymentModal from './CPaymentModal'
import BodyInvoice from '@/app/api/BodyInvoice.json'

type Props = {
    checkedRows: { [key: string]: boolean };
  };

const PaymentModal = ({checkedRows}: Props) => {
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [providerPay, setCustomerPay] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState("");

    const isDisabled = !Object.values(checkedRows).some(Boolean)
    // Danh sách hàng được chọn
    const selectedInvoices = BodyInvoice.filter(item => checkedRows[item.invoice_id]);
    // Tính tổng tiền
    const totalDebt = selectedInvoices.reduce((total, item) => total + item.remaining ,0)

    const handleOpen = () => {
        const now = new Date();
        const formatted = now.toLocaleString('vi-VN', {
          hour12: false,
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setCurrentTime(formatted);
        setPaymentModalOpen(true);
      };
      
    const handleClose = () => setPaymentModalOpen(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
      
        if (paymentModalOpen) {
          const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleString('vi-VN', {
              hour12: false,
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
            setCurrentTime(formatted);
          };
      
          updateTime(); // Gọi ngay lần đầu
          interval = setInterval(updateTime, 1000); // Cập nhật mỗi giây
        }
      
        return () => clearInterval(interval); // Clear khi modal đóng
      }, [paymentModalOpen]);
      
    return (
            <Box>
                <Button sx={{
                    mt: '10px',
                    bgcolor: "#8DB883",
                    color: 'white',
                    width: "140px",
                }} onClick={handleOpen} endIcon={<AttachMoneyIcon />} disabled={isDisabled}>Thanh toán</Button>

                <Modal
                    open={paymentModalOpen}
                    onClose={handleClose}
                >
                    <Box sx={{
                        width: "70%",
                        height: "70%",
                        bgcolor: "white",
                        mx: "auto",
                        mt: "80px",
                        borderRadius: "10px",
                        overflowY: 'auto'
                    }}>
                        
                        {/* Head Modal */}
                        <Box sx={{
                                minHeight: "40px",
                                bgcolor: '#8DB883',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                color: 'white',
                                borderTopRightRadius: "10px",
                                borderTopLeftRadius: "10px",
                                p: "0 20px",
                                position: 'sticky',
                                top: '0',
                                zIndex: 1000,
                            }}>
                                <Typography sx={{
                                    fontSize: "20px",
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}>Thanh toán</Typography>
                                <IconButton sx={{ color: 'white' }} onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                        </Box>
                        {/* BOX BIG */}
                        <Box px={2}>
                            {/* BoardModal */}
                            <Box sx={{ mt: '20px', px: 2 }}>
                                {/* Container flex để căn chỉnh Left, Center, Right */}
                                <Box sx={{ display: 'flex', gap: 3 }}>
                                    {/* Left */}
                                    <Box sx={{ width: "30%" }}>
                                        <Box>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <Typography>Nợ hiện tại</Typography>
                                                <Typography>{totalDebt.toLocaleString('vi-VN')} VND</Typography>
                                            </Box>
                                            <Divider sx={{ my: 1 }} />
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography>Thu tiền khách</Typography>
                                                <NumericFormat
                                                value={providerPay}
                                                onValueChange={(values) => {
                                                    setCustomerPay(values.floatValue || 0); // ✅ Giá trị thật dạng số
                                                }}

                                        customInput={TextField}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        valueIsNumericString
                                        suffix=" VND"
                                        variant="standard"
                                        sx={{ 
                                            height: 35, 
                                            '& .MuiInputBase-input': {
                                                textAlign: 'right',
                                            },
                                            '& .MuiInputBase-root': { height: 35 }, borderRadius: 10 }}
                                        />
                                            </Box>
                                            <Divider sx={{ my: 1 }} />
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <Typography>Nợ sau</Typography>
                                                <Typography>{(totalDebt - providerPay).toLocaleString('vi-VN')} VND</Typography>
                                            </Box>
                                        </Box> 
                                    </Box>
                                            
                                    {/* Thêm cột dọc phân cách */}
                                    <Box sx={{ borderLeft: "1px solid #ccc", height: "auto", mx: 2 }} />  {/* Cột dọc */}
                                    {/* Center */}
                                    <Box sx={{ width: '40%' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography>Thời gian</Typography>
                                            {/* Hiện thời gian thức */}
                                            <Typography>{currentTime}</Typography>
                                        </Box>
            
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mt: "10px",
                                        }}>
                                            <Typography>Phương thức</Typography>
                                            <Select
                                                sx={{
                                                    width: "210px",
                                                    height: "40px",
                                                    "& .MuiSelect-select": {
                                                        padding: "8px",
                                                        minHeight: "32px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        textAlign: 'end', 
                                                    },                       
                                                }}
                                                // key={getActiveOrderPaymentMethod()}
                                                // value={getActiveOrderPaymentMethod()}
                                                // onChange={(event: SelectChangeEvent<string>) =>
                                                //     updateOrderField("paymentMethod", event.target.value)
                                                // }
                                            >
                                                <MenuItem value="Chuyển khoản cá nhân">Chuyển khoản cá nhân</MenuItem>
                                                <MenuItem value="Chuyển khoản công ty">Chuyển khoản công ty</MenuItem>
                                                <MenuItem value="Tiền mặt">Tiền mặt</MenuItem>
                                            </Select>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />                   
                            {/* Body Modal */}
                            <Box>
                                <CPaymentModal 
                                    selectedInvoices={selectedInvoices}
                                    providerPay={providerPay}
                                    totalDebt={totalDebt}
                                />
                            </Box>

                            {/* Foot Modal */}
                            <Box sx={{
                                mt: '30px',
                                mb: '10px',
                                display: 'flex',
                                justifyContent: 'end',
                                gap: 2,
                                px: "10px",   
                                }}>
                                <Button sx={{
                                    bgcolor: '#8DB883',
                                    color: 'white'
                                }}>Thanh toán</Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal >
            </Box >
    )
}

export default PaymentModal