

"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useOrderContext} from "@/app/context/OrderContext";


export default function ScrollableTabsButtonAuto() {

  // Context
  const { orders, activeOrderId ,setActiveOrder, addOrder, removeOrder} = useOrderContext();

  
  // Xử lý thay đổi tab
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue >= 0 && newValue < orders.length) {
      setActiveOrder(orders[newValue]?.id ?? 1); // Nếu không có id, gán chuỗi rỗng ""
    }
  };
  //  // Hàm tìm số thứ tự lớn nhất trong danh sách tabs
  //  const getMaxTabNumber = () => {
  //   const numbers = tabs
  //     .map((tab) => parseInt(tab.replace(/\D/g, ""), 10)) // Lấy số trong "Đặt hàng X"
  //     .filter((num) => !isNaN(num)); // Lọc số hợp lệ
  //   return numbers.length > 0 ? Math.max(...numbers) : 0; // Lấy số lớn nhất
  // };


  // Xử lý thêm tab mới
  const handleAddTab = () => {
    addOrder(); // ✅ Gọi OrderContext để tạo đơn hàng mới
    // const newTabIndex = getMaxTabNumber() + 1;
    // setTabs([...tabs, `Đặt hàng ${newTabIndex}`]);
    // setValue(newTabIndex - 1); // Chuyển sang tab mới
  };

  // Xử lý xóa tab
  const handleRemoveTab = (index: number) => {
    const orderToRemove = orders[index]?.id;
    if (orderToRemove) {
        removeOrder(orderToRemove);
    }
};



  // Other
  const renderOrderLabel = (order: Order, index: number, handleRemoveTab: (index: number) => void) => {
    // 🔹 Tạo danh sách chỉ gồm các đơn "order-X"
    const orderList = orders.filter(o => o.id.startsWith("order-"));
  
    // 🔹 Xác định số thứ tự thực sự của đơn hàng
    const orderIndex = orderList.findIndex(o => o.id === order.id) + 1;
  
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {order.id.startsWith("DH") ? order.id : `Đặt hàng ${orderIndex}`} {/* ✅ Hiển thị đúng số */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveTab(index);
          }}
          sx={{ ml: 1, "&:hover": { color: "red" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  };
  
  
  return (
    <Box
      sx={{
        // width: '900x',
        mt: '5px',
        ml: "100px",
        maxWidth: { xs: 320, sm: 1100 },
        bgcolor: "#8DB883",
        display: "flex",
        alignItems: "center",

      }}
    >
      <Tabs
        value={orders.findIndex((order) => order.id === activeOrderId)}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          "& .MuiTabs-indicator": {
            display: "none", // ✅ Ẩn gạch trắng phía dưới
          },
        }}
      >
        {orders.map((order, index) => (
          <Tab
            key={order.id || `tab-${index}`} // ✅ Nếu order.id bị undefined, dùng index làm key
            component="div"
              label={renderOrderLabel(order, index, handleRemoveTab)} // ✅ Dùng hàm thay vì viết inline
              disableRipple // ✅ Vô hiệu hóa hiệu ứng ripple
              disableFocusRipple // ✅ Vô hiệu hóa ripple khi focus
            sx={{
              height: '10px',
              fontWeight: '700px',
              color: "white", // Màu chữ mặc định
              backgroundColor: "#8db883", // Nền xanh mặc định
              "&.Mui-selected": {
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                color: "#8db883", // Màu chữ khi active
                backgroundColor: "white", // Nền trắng khi active
              },
            }}
          />
        ))}
      </Tabs>

      {/* Nút "+" chỉ xuất hiện bên cạnh tab cuối cùng */}
      <IconButton onClick={() => {
        handleAddTab() ;
        addOrder();
      }} sx={{ ml: 1 }}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}


