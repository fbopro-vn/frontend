'use client'
import * as React from "react";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import CPaymentModal from '@/app/(allpage)/(ke_toan)/nhap_thu/Modals/DebtPayment/DebtPaymentModal/PaymentModal/CPaymentModal'
import BlockIcon from '@mui/icons-material/Block';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const PaymentModal = () => {
    const [paymentModalOpen, setPaymentModalOpen] = React.useState(false);
    const handleOpen = () => setPaymentModalOpen(true);
    const handleClose = () => setPaymentModalOpen(false);

    return (
            <Box>
                <Button sx={{
                    bgcolor: "#8DB883",
                    color: 'white',
                    width: "140px",
                }} onClick={handleOpen} startIcon={<AttachMoneyIcon />}>Thanh toán</Button>

                <Modal
                    open={paymentModalOpen}
                    onClose={handleClose}
                >
                    <Box sx={{
                        width: "70%",
                        height: "75%",
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

                        {/* BoardModal */}
                        <Box sx={{ mt: '20px', px: 2 }}>
                            {/* Container flex để căn chỉnh Left, Center, Right */}
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                gap: 4,
                            }}>
                                {/* Left */}
                                <Box sx={{
                                    flex: '1 1 30%', // Điều chỉnh để mỗi phần chiếm khoảng 30% chiều rộng
                                    minWidth: '220px', // Đảm bảo mỗi phần có độ rộng tối thiểu
                                    mb: 2, // Margin dưới cho các phần
                                }}>
                                    <Box>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <Typography>Nợ hiện tại</Typography>
                                            <Typography>500.000.000</Typography>
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            my: "10px",
                                        }}>
                                            <Typography>Thu tiền khách</Typography>
                                            <TextField variant="standard" sx={{ '& input': { textAlign: 'right', }, }} />
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <Typography>Nợ sau</Typography>
                                            <Typography>100.000.000</Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Center */}
                                <Box sx={{
                                    flex: '1 1 30%',
                                    minWidth: '220px',
                                    mb: 2,
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Typography>Thời gian</Typography>
                                        <TextField variant="standard" type="number" />
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

                                {/* Right */}
                                <Box sx={{
                                    flex: '1 1 30%',
                                    minWidth: '220px',
                                    mb: 2,
                                }}>
                                    {/* TextField Ghi Chú giống textarea */}
                                    <TextField
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    border: 'none', // Ẩn border
                                                },
                                                '&:hover fieldset': {
                                                    border: 'none', // Ẩn border khi hover
                                                },
                                                '&.Mui-focused fieldset': {
                                                    border: 'none', // Ẩn border khi focus
                                                },
                                            },
                                            '& ::placeholder': {
                                                fontStyle: 'italic', // Đặt placeholder thành in nghiêng
                                            },
                                        }}
                                        id="outlined-basic"
                                        placeholder="Ghi chú..."
                                        variant="outlined"
                                        multiline
                                        minRows={4}
                                        maxRows={4}

                                    />
                                </Box>
                            </Box>
                        </Box>


                        {/* Body Modal */}
                        <Box>
                            <CPaymentModal/>
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
                            <Button startIcon={<AddCircleOutlineIcon/>} sx={{
                                bgcolor: '#2ed573',
                                color: 'white'
                            }}>Tạo phiếu thu</Button>
                            <Button startIcon={<AddCircleOutlineIcon/>} sx={{
                                bgcolor: '#2ed573',
                                color: 'white'
                            }}>Tạo phiếu thu & in</Button>
                            <Button startIcon={<BlockIcon/>} sx={{
                                bgcolor: '#bdc3c7',
                                color: 'white'
                            }}>Bỏ qua</Button>
                        </Box>
                    </Box>
                </Modal >
            </Box >
    )
}

export default PaymentModal