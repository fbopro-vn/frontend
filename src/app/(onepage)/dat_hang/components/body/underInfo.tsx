"use client";
import { useRef, useState } from "react";
import { useOrderContext } from "@/app/context/OrderContext";
import {
  Box,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { SelectChangeEvent } from "@mui/material";
import { toast } from "react-toastify";
import useCartData from "@/app/hooks/useCartData";
import usePaginatedCartData from "@/app/hooks/usePaginatedCartData";
import "@/app/components/css_animation/loaderOther.css";

const UnderInfo = () => {
  const { mutate } = useCartData("http://api.sdc.com:8000/v1/orders/cart");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const depositInputRef = useRef<HTMLInputElement | null>(null);
  const {
    orders,
    isCheckoutMode,
    getActiveOrderDeposit,
    // getActiveOrderPaidPayment,
    updateOrderField,
    getActiveOrderPaymentMethod,
    getActiveOrderPaymentStatus,
    getTotalMoney,
    getFilteredOrder,
    getFilteredInvoice,
    removeOrder,
    activeOrderId,
    validateOrderErrors,
    updateOrderInCart,
    // addSpecificOrder,
    updateActiveOrderSeller,
    getTotalPriceProduct,
    getActiveOrderPaidPayment,
    updateActiveOrderPaidPayment,
  } = useOrderContext();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const paidPayment = getActiveOrderPaidPayment();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const customerPaid = getActiveOrderDeposit(); // Tùy bạn lấy tiền đặt cọc hay tiền đã trả
  const customerMustPay = getTotalMoney() - customerPaid;
  const remainingPayment = customerMustPay - paidPayment;
  // OK
  // const handleOrderSubmit = async (): Promise<void> => {
  //   const orderData = getFilteredOrder(); // Lấy dữ liệu cần gửi
  //   if (!validateOrderErrors()) {
  //     return;
  //   }

  //   console.log("Dữ liệu gửi đi", orderData);
  //   setIsLoading(true); // Bật spinner

  //   // Lấy access_token từ localStorage hoặc sessionStorage
  //   const accessToken = localStorage.getItem('access_token');
  //   if (!accessToken) {
  //     toast.error("❌ Không tìm thấy access token!");
  //     setIsLoading(false);
  //     return;
  //   }

  //   if (activeOrderId) {
  //     try {
  //       const response = await fetch('http://api.sdc.com:8000/v1/orders', {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json, text/plain, */*',
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${accessToken}`, // Thêm token vào header
  //         },
  //         body: JSON.stringify(orderData)
  //       });

  //       const resData = await response.json();
  //       console.log(">>>> check ResData Đặt hàng", resData);
  //       if (resData) {
  //         removeOrder(activeOrderId);
  //         updateActiveOrderSeller({ id: "", fullname: "" });
  //           // Delay nếu backend xử lý chậm
  //       await new Promise(resolve => setTimeout(resolve, 2000));

  //       // Refresh lại dữ liệu giỏ hàng (fetch lại từ API giỏ hàng)
  //       mutate('http://api.sdc.com:8000/v1/orders/cart'); // reload dữ liệu cache
  //       }
  //     } catch (error) {
  //       toast.error("❌ Lỗi khi đặt hàng!");
  //       console.error("Lỗi khi đặt hàng:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  // Đặt hàng
  const handleOrderSubmit = async (): Promise<void> => {
    const orderData = getFilteredOrder(paidPayment); // Lấy dữ liệu cần gửi
    if (!validateOrderErrors("order")) return;

    console.log("Dữ liệu gửi đi", orderData);
    setIsLoading(true); // Bật spinner

    // Lấy access_token từ localStorage hoặc sessionStorage
    let accessToken = "";
    if (typeof window !== "undefined") {
      accessToken = localStorage.getItem("access_token") || "";
    }

    if (!accessToken) {
      toast.error("❌ Không tìm thấy access token!");
      setIsLoading(false);
      return;
    }

    if (activeOrderId) {
      try {
        const response = await fetch("http://api.sdc.com:8000/v1/orders", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Thêm token vào header
          },
          body: JSON.stringify(orderData),
        });

        const resData = await response.json();
        console.log(">>>> check ResData Đặt hàng", resData);
        if (resData) {
          removeOrder(activeOrderId);
          updateActiveOrderSeller({ id: "", fullname: "" });
          mutate(); // refetch lại
        }
      } catch (error) {
        toast.error("❌ Lỗi khi đặt hàng!");
        console.error("Lỗi khi đặt hàng:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Thanh toán
  const handlerOrderPay = async (): Promise<void> => {
    const invoiceData = getFilteredInvoice(paidPayment);
    if (!validateOrderErrors("checkout")) return;

    setIsLoading(true); // Thêm spiner
    // Dữ liệu gửi qua
    console.log("Dữ liệu gửi qua", invoiceData);
    if (activeOrderId) {
      try {
        const response = await fetch(
          `http://api.sdc.com:8000/v1/orders/${activeOrderId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Lấy token từ localStorage
              "Content-Type": "application/json",
            },
            body: JSON.stringify(invoiceData),
          }
        );

        const resData = await response.json();
        console.log(">>>> check REsdata", resData);
        if (resData) {
          // mutate("http://api.sdc.com:8000/v1/orders");
          // mutate("http://api.sdc.com:8000/v1/orders/cart");
          removeOrder(activeOrderId);
          mutate();
        }
      } catch (error) {
        toast.error("❌ Lỗi khi thanh toán!");
        console.error("Lỗi khi thanh toán:", error);
      } finally {
        setIsLoading(false);
      } // Thêm spiner}
    }
  };

  // Lưu
  const handleUpdate = async (): Promise<void> => {
    if (!activeOrderId) return;

    if (!validateOrderErrors("checkout", paidPayment)) return;

    setIsLoading(true);

    try {
      const updated = await updateOrderInCart(activeOrderId, paidPayment);
      if (updated) {
        removeOrder(activeOrderId);
        mutate("http://api.sdc.com:8000/v1/orders/cart"); // Refresh lại cache nếu dùng swr
      } else {
        toast.error("❌ Lỗi khi lưu đơn hàng!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi lưu đơn hàng:", error);
      toast.error("❌ Lỗi khi lưu đơn hàng!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Goc
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        minHeight: "250px",
        mt: "10px",
        ml: "30px",
        p: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
      }}
    >
      {/* Hàng 1: Khách thanh toán & Hình thức thanh toán */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          mb: 2,
        }}
      >
        {/* Nếu là Checkout Mode (Thanh toán đơn hàng) */}
        {isCheckoutMode && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Khách thanh toán
            </Typography>
            <NumericFormat
              value={paidPayment} // Luôn là 0
              onValueChange={(valueObj) =>
                updateActiveOrderPaidPayment(Number(valueObj.value) || 0)
              }
              onFocus={() => {
                setTimeout(() => {
                  if (inputRef.current) inputRef.current.select();
                }, 0);
              }}
              getInputRef={(el: HTMLElement | null) => {
                inputRef.current =
                  el instanceof HTMLInputElement
                    ? el
                    : el?.querySelector("input") ?? null;
              }}
              customInput={TextField}
              thousandSeparator="."
              decimalSeparator=","
              valueIsNumericString
              suffix=" VND"
              variant="outlined"
              fullWidth
              sx={{
                height: "40px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  "& input": {
                    padding: "8px 12px",
                  },
                },
              }}
              // Nên thêm readOnly để không cho nhập
            />
          </Box>
        )}

        {/* Nếu là Đặt hàng (Cọc) */}
        {!isCheckoutMode && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Khách thanh toán (cọc)
            </Typography>
            <NumericFormat
              value={getActiveOrderDeposit()}
              onValueChange={(values) =>
                updateOrderField("deposit", Number(values.value) || 0)
              }
              onFocus={() => {
                setTimeout(() => {
                  depositInputRef.current?.select();
                }, 0);
              }}
              getInputRef={(el: HTMLElement | null) => {
                depositInputRef.current =
                  el instanceof HTMLInputElement
                    ? el
                    : el?.querySelector("input") ?? null;
              }}
              customInput={TextField}
              thousandSeparator="."
              decimalSeparator=","
              valueIsNumericString
              suffix=" VND"
              variant="outlined"
              fullWidth
              sx={{
                height: "40px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  "& input": {
                    padding: "8px 12px",
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Hình thức thanh toán */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" fontWeight="bold" mb={1}>
            Hình thức thanh toán
          </Typography>
          <Select
            sx={{
              width: "100%",
              height: "40px",
              "& .MuiSelect-select": {
                padding: "8px",
                minHeight: "32px",
                display: "flex",
                alignItems: "center",
              },
            }}
            key={getActiveOrderPaymentMethod()}
            value={getActiveOrderPaymentMethod()}
            onChange={(event: SelectChangeEvent<string>) =>
              updateOrderField("paymentMethod", event.target.value)
            }
          >
            <MenuItem value="Chuyển khoản cá nhân">
              Chuyển khoản cá nhân
            </MenuItem>
            <MenuItem value="Chuyển khoản công ty">
              Chuyển khoản công ty
            </MenuItem>
            <MenuItem value="Tiền mặt">Tiền mặt</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Hàng 2: Trạng thái thanh toán */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body1" fontWeight="bold">
            Thu hộ (COD)
          </Typography>
          <Switch
            checked={getActiveOrderPaymentStatus()}
            onChange={() => {
              const nextStatus = getActiveOrderPaymentStatus()
                ? "Công nợ"
                : "Chờ thanh toán";
              updateOrderField("paymentStatus", nextStatus);
            }}
          />
        </Box>

        <Box sx={{ color: "green" }}>
          <Typography variant="body1" fontWeight="bold">
            Trạng Thái Thanh Toán:
          </Typography>

          {isCheckoutMode ? (
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                color:
                  remainingPayment <= 0
                    ? "green"
                    : getActiveOrderPaymentStatus()
                    ? "green"
                    : "error.main",
              }}
            >
              {customerMustPay <= 0
                ? "Thu tiền Khách: 0 VND"
                : getActiveOrderPaymentStatus()
                ? `Thu tiền Khách: ${remainingPayment.toLocaleString(
                    "vi-VN"
                  )} VND`
                : `Ghi công nợ: ${remainingPayment.toLocaleString(
                    "vi-VN"
                  )} VND`}
            </Typography>
          ) : (
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                color:
                  getTotalMoney() - getActiveOrderDeposit() === 0
                    ? "green"
                    : getActiveOrderPaymentStatus()
                    ? "green"
                    : "error.main",
              }}
            >
              {getTotalMoney() - getActiveOrderDeposit() === 0
                ? "Thu tiền Khách: 0 VND"
                : getActiveOrderPaymentStatus()
                ? `Thu tiền Khách: ${(
                    getTotalMoney() - getActiveOrderDeposit()
                  ).toLocaleString("vi-VN")} VND`
                : `Ghi công nợ: ${(
                    getTotalMoney() - getActiveOrderDeposit()
                  ).toLocaleString("vi-VN")} VND`}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Nút hành động */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          paddingRight: "14px",
          mt: "7px",
        }}
      >
        <Box sx={{ display: "flex", gap: "40px" }}>
          {/* Nếu là Checkout Mode (Thanh toán đơn hàng) */}
          {isCheckoutMode && (
            <>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8DB883",
                  fontSize: "16px",
                  fontWeight: "bold",
                  width: "150px",
                  color: "white",
                }}
              >
                In
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8DB883",
                  fontSize: "16px",
                  fontWeight: "bold",
                  width: "150px",
                  color: "white",
                }}
                onClick={handlerOrderPay} // Tạm thời
              >
                Thanh Toán
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8DB883",
                  fontSize: "16px",
                  fontWeight: "bold",
                  width: "150px",
                  color: "white",
                }}
                onClick={() => handleUpdate()}
              >
                Lưu
              </Button>
            </>
          )}

          {/* Nếu là Đặt hàng (Cọc) */}
          {!isCheckoutMode && (
            <>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8DB883",
                  fontSize: "16px",
                  fontWeight: "bold",
                  width: "150px",
                  color: "white",
                }}
              >
                In
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8DB883",
                  fontSize: "16px",
                  fontWeight: "bold",
                  width: "150px",
                  color: "white",
                }}
                onClick={() => handleOrderSubmit()}
              >
                Đặt hàng
              </Button>
            </>
          )}
        </Box>
      </Box>
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)", // nền mờ
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Box className="loader" />
        </Box>
      )}
    </Box>

    // Loader

    // v2
  );
};

export default UnderInfo;

// <Box
// sx={{
//   width: "100%",
//   maxWidth: "600px",
//   minHeight: "250px",
//   mt: "10px",
//   ml: "30px",
//   p: "20px",
//   borderRadius: "10px",
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//   backgroundColor: "white",
// }}
// >
// {/* Hàng 1: Khách thanh toán & Hình thức thanh toán */}
// <Box
//   sx={{
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: "20px",
//     mb: 2,
//   }}
// >
//   {/* Nếu là Checkout Mode (Thanh toán đơn hàng) */}
//   {isCheckoutMode && (
//     <Box sx={{ flex: 1 }}>
//       <Typography variant="body1" fontWeight="bold" mb={1}>
//         Khách thanh toán
//       </Typography>
//       <NumericFormat
//         value={getActiveOrderPaidPayment()}
//         onValueChange={(valueObj) => {
//           updatePaidPayment(Number(valueObj.value) || 0);
//         }}
//         onFocus={() => {
//           // ✅ Khi focus thì select toàn bộ
//           setTimeout(() => {
//             if (inputRef.current) inputRef.current.select();
//           }, 0);
//         }}
//         customInput={TextField}
//         getInputRef={(el: HTMLElement | null) => {
//           inputRef.current = el instanceof HTMLInputElement ? el : el?.querySelector('input') ?? null;
//         }}
//         thousandSeparator="."
//         decimalSeparator=","
//         valueIsNumericString
//         suffix=" VND"
//         variant="outlined"
//         fullWidth
//         sx={{
//           height: "40px",
//           "& .MuiOutlinedInput-root": {
//             height: "40px",
//             "& input": {
//               padding: "8px 12px",
//             },
//           },
//         }}
//       />
//     </Box>

//   )}

//   {/* Nếu là Đặt hàng (Cọc) */}
//   {!isCheckoutMode && (
//     <Box sx={{ flex: 1 }}>
//       <Typography variant="body1" fontWeight="bold" mb={1}>
//         Khách thanh toán (cọc)
//       </Typography>
//       <NumericFormat
//         value={getActiveOrderDeposit()}
//         onValueChange={(values) =>
//           updateOrderField("deposit", Number(values.value) || 0)
//         }
//         onFocus={() => {
//           setTimeout(() => {
//             depositInputRef.current?.select();
//           }, 0);
//         }}
//         getInputRef={(el: HTMLElement | null) => {
//           depositInputRef.current =
//             el instanceof HTMLInputElement
//               ? el
//               : el?.querySelector("input") ?? null;
//         }}
//         customInput={TextField}
//         thousandSeparator="."
//         decimalSeparator=","
//         valueIsNumericString
//         suffix=" VND"
//         variant="outlined"
//         fullWidth
//         sx={{
//           height: "40px",
//           "& .MuiOutlinedInput-root": {
//             height: "40px",
//             "& input": {
//               padding: "8px 12px",
//             },
//           },
//         }}
//       />
//     </Box>
//   )}

//   {/* Hình thức thanh toán */}
//   <Box sx={{ flex: 1 }}>
//     <Typography variant="body1" fontWeight="bold" mb={1}>
//       Hình thức thanh toán
//     </Typography>
//     <Select
//       sx={{
//         width: "100%",
//         height: "40px",
//         "& .MuiSelect-select": {
//           padding: "8px",
//           minHeight: "32px",
//           display: "flex",
//           alignItems: "center",
//         },
//       }}
//       key={getActiveOrderPaymentMethod()}
//       value={getActiveOrderPaymentMethod()}
//       onChange={(event: SelectChangeEvent<string>) =>
//         updateOrderField("paymentMethod", event.target.value)
//       }
//     >
//       <MenuItem value="Chuyển khoản cá nhân">Chuyển khoản cá nhân</MenuItem>
//       <MenuItem value="Chuyển khoản công ty">Chuyển khoản công ty</MenuItem>
//       <MenuItem value="Tiền mặt">Tiền mặt</MenuItem>
//     </Select>
//   </Box>
// </Box>

// {/* Hàng 2: Trạng thái thanh toán */}
// <Box sx={{ width: "100%" }}>
//   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//     <Typography variant="body1" fontWeight="bold">
//       Thu hộ (COD)
//     </Typography>
//     <Switch
//       checked={getActiveOrderPaymentStatus()}
//       onChange={() => {
//         updateOrderField("paymentStatus", !getActiveOrderPaymentStatus());
//       }}
//     />
//   </Box>

//   <Box sx={{ color: "green" }}>
//     <Typography variant="body1" fontWeight="bold">
//       Trạng Thái Thanh Toán:
//     </Typography>

//     {/* Trạng Thái Thanh Toán*/}
//     {isCheckoutMode && (
//       <Typography
//         variant="body1"
//         fontWeight="bold"
//         sx={{
//           color:
//             totalNeedPay - getActiveOrderDeposit() - getActiveOrderPaidPayment() === 0
//               ? "green"
//               : getActiveOrderPaymentStatus()
//                 ? "green"
//                 : "error.main",
//         }}
//       >
//         {totalNeedPay - getActiveOrderDeposit() - getActiveOrderPaidPayment() === 0
//           ? "Thu tiền Khách: 0 VND"
//           : getActiveOrderPaymentStatus()
//             ? `Thu tiền Khách: ${(totalNeedPay - getActiveOrderDeposit() - getActiveOrderPaidPayment()).toLocaleString()} VND`
//             : `Ghi công nợ: ${(totalNeedPay - getActiveOrderDeposit() - getActiveOrderPaidPayment()).toLocaleString()} VND`}
//       </Typography>)}
//     {!isCheckoutMode && (
//       <Typography
//         variant="body1"
//         fontWeight="bold"
//         sx={{
//           color:
//             totalNeedPay - getActiveOrderDeposit() === 0
//               ? "green"
//               : getActiveOrderPaymentStatus()
//                 ? "green"
//                 : "error.main",
//         }}
//       >
//         {totalNeedPay - getActiveOrderDeposit() === 0
//           ? "Thu tiền Khách: 0 VND"
//           : getActiveOrderPaymentStatus()
//             ? `Thu tiền Khách: ${(totalNeedPay - getActiveOrderDeposit()).toLocaleString()} VND`
//             : `Ghi công nợ: ${(totalNeedPay - getActiveOrderDeposit()).toLocaleString()} VND`}
//       </Typography>
//     )}
//   </Box>
// </Box>

// {/* Nút hành động */}
// <Box
//   sx={{
//     display: "flex",
//     justifyContent: "end",
//     alignItems: "center",
//     paddingRight: "14px",
//     mt: "7px",
//   }}
// >
//   <Box sx={{ display: "flex", gap: "40px" }}>
//     {/* Nếu là Checkout Mode (Thanh toán đơn hàng) */}
//     {isCheckoutMode && (
//       <>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#8DB883", fontSize: "16px", fontWeight: "bold", width: "150px", color: 'white' }}
//         >
//           In
//         </Button>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#8DB883", fontSize: "16px", fontWeight: "bold", width: "150px", color: 'white' }}
//           onClick={handlerOrderPay} // Tạm thời
//         >
//           Thanh Toán
//         </Button>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#8DB883", fontSize: "16px", fontWeight: "bold", width: "150px", color: 'white' }}
//           onClick={() => handlerUpdate()}
//         >
//           Lưu
//         </Button>
//       </>
//     )}

//     {/* Nếu là Đặt hàng (Cọc) */}
//     {!isCheckoutMode && (
//       <>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#8DB883", fontSize: "16px", fontWeight: "bold", width: "150px", color: 'white' }}
//         >
//           In
//         </Button>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#8DB883", fontSize: "16px", fontWeight: "bold", width: "150px", color: 'white' }}
//           onClick={() => handleOrderSubmit()}
//         >
//           Đặt hàng
//         </Button>
//       </>
//     )}
//   </Box>
// </Box>
// {isLoading && (
//   <Box
//     sx={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100vw",
//       height: "100vh",
//       backgroundColor: "rgba(0,0,0,0.3)", // nền mờ
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 9999,
//     }}
//   >
//     <Box className="loader" />
//   </Box>
// )}

// </Box>
