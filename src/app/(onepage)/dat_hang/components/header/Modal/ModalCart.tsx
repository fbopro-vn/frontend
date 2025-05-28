"use client";
import  React,{ useState, useEffect, useRef } from "react";
import {
    Box,
    Modal,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DateFill from '@/app/components/Datetime/DateFill';
import useCartData from "@/app/hooks/useCartData";
import Skeleton from "@mui/material/Skeleton";
import removeVietnameseTones from "@/app/utils/removeVietnameseTones"; // Import hàm xử lý dấu
import dayjs from "dayjs";
import { useOrderContext } from "@/app/context/OrderContext";
import socket from '@/app/utils/socket'
import { mutate } from 'swr'

export default function ModalCart() {

    // const [filteredData, setFilteredData] =  useState<Pick<DataItem, "id" | "date" | "customer" | "subtotal">[]>([]); // Dữ liệu sau khi lọc
    const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
    const [open, setOpen] = useState(false);
    const [searchOrderId, setSearchOrderId] = useState(""); 
    const [searchCustomer, setSearchCustomer] = useState(""); 
    const { cartData, error, isLoading } = useCartData('http://api.fbopro.vn/v1/orders/cart');
    

    const handleOpen = () => {
        setOpen(true); // Mở modal
    };

    const handleClose = () => {
        setOpen(false); // Đóng modal
    };

    // Set conText
    const {addSpecificOrder } = useOrderContext();

    // // Định nghĩa bộ lọc
    // const applyFilters = () => {
    //     if (!cartData || cartData.length === 0) return;

    //     const lowerCaseOrderId = removeVietnameseTones(searchOrderId.trim().toLowerCase());
    //     const lowerCaseCustomer = removeVietnameseTones(searchCustomer.trim().toLowerCase());

    //     const start = dateRange.startDate ? dayjs(dateRange.startDate, "DD/MM/YYYY") : null;
    //     const end = dateRange.endDate ? dayjs(dateRange.endDate, "DD/MM/YYYY") : null;

    //     const filteredOrders = cartData.filter(order => {
    //         const orderDate = dayjs(order.date, "D/M/YYYY");

    //         // ✅ Lọc theo mã đơn hàng
    //         const matchesId = lowerCaseOrderId ? removeVietnameseTones(order.id.toLowerCase()).includes(lowerCaseOrderId) : true;

    //         // ✅ Lọc theo khách hàng (full-text search)
    //         const matchesCustomer = lowerCaseCustomer
    //             ? lowerCaseCustomer.split(" ").every(term => removeVietnameseTones(order.customer.toLowerCase()).includes(term))
    //             : true;

    //         // ✅ Lọc theo khoảng thời gian
    //         const matchesDate =
    //             (!start || orderDate.isAfter(start.subtract(1, "day"))) &&
    //             (!end || orderDate.isBefore(end.add(1, "day")));

    //         return matchesId && matchesCustomer && matchesDate;
    //     });

    //     setFilteredData(filteredOrders);
    // };


    // Định nghĩa thay đổi ngày từ DateFill
      // ✅ Khi thay đổi ngày từ DateFill
    //   const handleDateChange = (startDate: string, endDate: string) => {
    //     setDateRange({ startDate, endDate });
    //     applyFilters(); // Cập nhật bộ lọc khi thay đổi ngày
    // };


// const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter") {
//         applyFilters();
//     }
// };

// useEffect(() => {
//     applyFilters();
// }, [searchOrderId, searchCustomer, dateRange]);
    //New


    // if (error) {
    //     return <div>Error loading data</div>;
    // }
    return (
        <>
            <Button sx={{
                color: "#fff"
            }} onClick={handleOpen}>
                <ShoppingCartCheckoutIcon
                    fontSize="large"
                />
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "40%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 1400,
                        minHeight: 631,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        borderRadius: "10px",
                    }}
                >
                    {/* Header */}
                    <Box sx={{ bgcolor: "#8DB883", display: "flex", p:1, justifyContent: "center", alignItems: "center", borderRadius: "8px 8px 0 0", gap: 40 }}>
                        <Typography fontSize={'26px'} fontWeight={'bold'} align="center" color="white" ml={'580px'}>
                            Xử Lý Đặt Hàng (Giỏ Hàng)
                        </Typography>
                        <Button onClick={handleClose} sx={{ color: "white" , pl: '120px'}}>
                            <CloseIcon fontSize="large" />
                        </Button>
                    </Box>
                    

                    {/* Box */}
                    <Box display="flex" minHeight="552px" gap={2} mt={2} p={2}>
                        <Box
                            sx={{
                                width: "30%",
                                border: '1px solid #8DB883',
                                p: 2,
                                borderRadius: 2,
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            <Typography variant="h6" sx={{
                                mb: 1,


                            }}>
                                Tìm kiếm
                            </Typography>
                            <TextField fullWidth placeholder="Nhập mã đặt hàng" sx={{
                                mb: 2.5,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px'
                                }
                            }} 
                                value={searchOrderId}
                            // onChange={(e) => setSearchOrderId(e.target.value)}
    // onKeyDown={handleSearch}
                            />
                            <TextField fullWidth placeholder="Nhập tên khách hàng" sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px'
                                }
                               
                            }}  value={searchCustomer}
                        //   onChange={(e) => setSearchCustomer(e.target.value)}
                        //   onKeyDown={handleSearch}
                            />
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Lọc Theo Thời Gian
                            </Typography>

                            {/* <DateFill 
                                onDateChange={handleDateChange}
                                dateRange={dateRange}
                                /> */}
                        </Box>

                        <TableContainer 
    component={Paper} 
    sx={{ 
        width: "70%", 
        borderRadius: "20px", 
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", 
        maxHeight: 520, // Giới hạn chiều cao
        overflowY: "auto", // Bật thanh cuộn
    }}
>
    <Table 
        stickyHeader 
        sx={{ 
            width: "100%", // Đảm bảo Table lấp đầy TableContainer
            tableLayout: "fixed", // Giữ bố cục cột cố định
        }}
    >
        {/* Header cố định */}
        <TableHead sx={{ 
            position: "sticky", 
            zIndex: 2000, 

     
        }}>
            <TableRow>
                <TableCell sx={{ width: "10%", color: "white", fontSize: "17px", fontWeight: "bold", backgroundColor: "#8DB883" }}>MDH</TableCell>
                <TableCell sx={{ width: "20%", color: "white", fontSize: "17px", fontWeight: "bold", backgroundColor: "#8DB883" }} align="center">Thời gian</TableCell>
                <TableCell sx={{ width: "20%", color: "white", fontSize: "17px", fontWeight: "bold", backgroundColor: "#8DB883" }}>Khách hàng</TableCell>
                <TableCell sx={{ width: "20%", color: "white", fontSize: "17px", fontWeight: "bold", backgroundColor: "#8DB883" }} align="center">Tổng tiền</TableCell>
                <TableCell sx={{ width: "20%", color: "white", fontSize: "17px", fontWeight: "bold", backgroundColor: "#8DB883" }} align="center">Hành động</TableCell>
            </TableRow>
        </TableHead>

        {/* Nội dung bảng */}
        <TableBody>
    {isLoading
        ? // Nếu đang tải, hiển thị skeleton thay vì dữ liệu thật
    (Array.from(new Array(7)).map((_, index) => (
              <TableRow key={index}>
                  <TableCell><Skeleton variant="text" width={100} height={30} /></TableCell>
                  <TableCell><Skeleton variant="text" width={120} height={30} /></TableCell>
                  <TableCell><Skeleton variant="text" width={150} height={30} /></TableCell>
                  <TableCell><Skeleton variant="text" width={130} height={30} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
              </TableRow>
          ))
        
        ) : (
            // Nếu có tìm kiếm mà không tìm thấy kết quả -> Hiển thị "Không tìm thấy kết quả"
            (searchOrderId || searchCustomer || dateRange.startDate || dateRange.endDate) && cartData.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ fontSize: "16px", fontStyle: "italic", color: "red" }}>
                        Không tìm thấy kết quả tìm kiếm
                    </TableCell>
                </TableRow>
            ) : (

                 // Nếu có dữ liệu -> Hiển thị bảng bình thường
        (cartData).map((order) => (
                <TableRow key= {order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell align="center">{order.createdAt}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell align="center">{order.totalMoney.toLocaleString('vi-VN')} VND</TableCell>
                    <TableCell align="center">
                    <Button variant="contained" size="small" sx={{ bgcolor: "#8DB883", color: 'white' }}  key={order.id} onClick={() => {
    addSpecificOrder(order.id);
    handleClose(); 
  }}
>
                          Chọn
                      </Button>
                    </TableCell>
                </TableRow>
            ))
        )
    )}
</TableBody>
 
    </Table>
</TableContainer>


                    </Box>
                </Box>
            </Modal>
        </>
    );
}

