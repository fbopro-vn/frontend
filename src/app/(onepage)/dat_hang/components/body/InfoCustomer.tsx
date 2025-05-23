'use client'
import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Paper, Select, MenuItem, Switch, FormControl, InputLabel } from "@mui/material";

import SearchCustomer from './SearchCustomer';
import SearchStaff from './SearchStaff';
import { useOrderContext } from "@/app/context/OrderContext"; // ✅ Import Context


const CustomerForm: React.FC = () => {
  const { orders, activeOrderId, updateActiveOrderCustomer, getActiveOrderNote, updateOrderField } = useOrderContext(); // 
  const activeOrder = orders.find(order => order.id === activeOrderId);
  const [isClient, setIsClient] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Nếu chưa có client-side render, không hiển thị component
  if (!isClient) return null;


  // const [paymentMethod, setPaymentMethod] = useState("Chuyển khoản cá nhân");
  // const [cod, setCod] = useState(false);
   

//   console.log("activeOrder:", activeOrder);
// console.log("activeOrder.customer:", activeOrder?.customer);

  return (

    <Box sx={{
      ml: "30px",
      width: '600px',
      height: '550px',
      border: '1px solid white',
      borderRadius: '10px',
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      display: 'flex',
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start", // Đặt phần tử lên trên, tránh giãn cách quá lớn
      padding: "20px", // Tạo khoảng cách bên trong Box
      gap: "25px", // Giảm khoảng cách giữa các TextField, điều chỉnh theo nhu cầu
      position: "relative"
    }}>
    
    <SearchStaff/>
    <SearchCustomer onSelectCustomer={(customer) => {
      console.log("🔍 Khách hàng được chọn:", customer); // Debug xem `customer` có đúng không
        setSelectedCustomer(customer);
        if (customer) { // ✅ Kiểm tra null trước khi gọi
          updateActiveOrderCustomer(customer);
      }
 // ✅ Lưu vào đơn hàng hiện tại
      }} />


{/* ID khach */}
    <TextField 
      value={activeOrder?.customer.id}
      sx={{ display: "none"}}
    />

    <TextField sx={{
    width: '520px',
    '& .MuiInputBase-root': {
      height: 30, // Chiều cao của input
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'default', // Màu mặc định của border
      },
      '&:hover fieldset': {
        borderColor: '#8DB883', // Khi hover, border sẽ đổi màu đỏ
      },
      '&.Mui-focused fieldset': {
        borderColor: '#8DB883', // Khi active (focused), border sẽ đổi màu vàng
      }}
  }}  
  placeholder="Tên Khách Hàng"  id="outlined-basic"  variant="outlined" slotProps={{
            input: {
                readOnly: true,
            },
        }}
        value={activeOrder?.customer?.name ?? ""}
        />
    <TextField sx={{ width: '520px', height: '30px', '& .MuiInputBase-root': {
        height: 30, // Chiều cao của input
        }
       }}  placeholder="Số Điện Thoại" id="outlined-basic"   variant="outlined" slotProps={{
            input: {
                readOnly: true,
            },
        }}
        value={activeOrder?.customer?.phone ?? ""}
        />
    <TextField sx={{ width: '520px', height: '30px', '& .MuiInputBase-root': {
        height: 30, // Chiều cao của input
    }
      }}  placeholder="Địa Chỉ Khách Hàng" id="outlined-basic"   variant="outlined" slotProps={{
            input: {
                readOnly: true,
            },

            
        }}
        
        value={activeOrder?.customer?.address ?? ""}/>

    {/* TextField Ghi Chú giống textarea */}
    <TextField 
        sx={{ width: '520px' }} 
        id="outlined-basic" 
        label="Ghi Chú Đơn Hàng" 
        value={getActiveOrderNote() || ""}
        onChange={(e) => updateOrderField("note", e.target.value)}
        variant="outlined" 
        multiline
        minRows={8}
        maxRows={8}
    />

    

   
    {/* <Button sx={{
      position: "absolute",
      color: "#8DB883",
      top: '67px',
      right: "34px"
    }}><ModalAddCustomer /></Button> */}
</Box>


  );
};

export default CustomerForm;
