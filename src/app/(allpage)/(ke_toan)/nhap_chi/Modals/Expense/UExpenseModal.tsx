import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedMaterials, selectTotalAmount, selectVat, selectPaymentMethod, selectDebt, selectPaidAmount, selectTotalPayable  } from '@/app/redux/store/selectors/purchaseSelector';
import { updateVat, updatePaidAmount , updatePaymentMethod } from "@/app/redux/features/Purchase/PurchaseSlice";

const UExpenseModal = () => {
  const materials = useSelector(selectSelectedMaterials);
  const dispatch = useDispatch()

  const total = useSelector(selectTotalAmount);
  const vat = useSelector(selectVat);
  const totalVat = (total*vat)/100
  const payMethod = useSelector(selectPaymentMethod)
  const paid = useSelector(selectPaidAmount);
  const totalPay = useSelector(selectTotalPayable);
  const debt = useSelector(selectDebt);
  const [paidInput, setPaidInput] = useState(paid.toLocaleString('vi-VN'));

  useEffect(() => {
    if (paid === 0) {
      setPaidInput('0');
    } else {
      setPaidInput(paid.toLocaleString('vi-VN'));
    }
  }, [paid]);
  return (
    <Box
    sx={{
        minHeight: '190px',
      mt: "10px",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "white",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",
    }}
  >   
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap', // Đề phòng hẹp màn hình vẫn đẹp
        gap: 2 // khoảng cách giữa các ô
      }}>
        {/* Tiền trả nhà cung cấp */}
        <Box sx={{ width: '40%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontSize={"18px"}>Tiền trả nhà cung cấp :</Typography>
          <TextField
            type='text'
              value={paidInput}
              onChange={(e) => {
                // Cho phép nhập số có dấu `.`
                const raw = e.target.value.replace(/[^\d]/g, ""); // giữ lại số
                const formatted = raw === '' ? '' : Number(raw).toLocaleString('vi-VN');
                setPaidInput(formatted);
                dispatch(updatePaidAmount(Number(raw)));
              }}
              onFocus={() => {
                // Bỏ dấu . khi focus (cho dễ chỉnh sửa)
                const raw = paidInput.replace(/[^\d]/g, "");
                setPaidInput(raw === '0' ? '' : raw);
              }}
              onBlur={() => {
                if (paidInput === '') {
                  setPaidInput('0');
                  dispatch(updatePaidAmount(0));
                } else {
                  const raw = paidInput.replace(/[^\d]/g, "");
                  setPaidInput(Number(raw).toLocaleString('vi-VN'));
                }
              }}
             
            sx={{
              width: "210px",
              "& .MuiInputBase-root": {
                height: "40px",
              },
              '& input': {
                fontSize: '18px',
                textAlign: "right",
              }
            }}
          />
        </Box>
      
        {/* Tổng tiền hàng */}
        <Box sx={{ width: '40%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontSize={"18px"}>Tổng tiền hàng :</Typography>
          <Typography fontSize={"18px"}>{total.toLocaleString('vi-VN')} VND</Typography>
        </Box>
      </Box>
      
      {/* DÒNG 2 */}
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        my: 2
      }}>
        {/* Phương thức thanh toán */}
        <Box sx={{ width: '40%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontSize={"18px"}>Phương thức thanh toán :</Typography>
          <Select
            sx={{
              width: "210px",
              height: "40px",
              fontSize: "16px",
              ml: 2,
            }}
            value={payMethod}
            onChange={(e) => dispatch(updatePaymentMethod((e.target.value)))}
          >
            <MenuItem value={"Chuyển khoản công ty"}>Chuyển khoản công ty</MenuItem>
            <MenuItem value={"Tiền mặt"}>Tiền mặt</MenuItem>
          </Select>
        </Box>
      
        {/* VAT */}
        <Box sx={{ width: '40%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box display="flex" alignItems="center">
            <Typography fontSize={"18px"}>VAT :</Typography>
            <Select
              sx={{
                width: "90px",
                height: "40px",
                fontSize: "16px",
                ml: 2,
              }}
              value={vat}
              onChange={(e) => dispatch(updateVat(Number(e.target.value)))}
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={8}>8%</MenuItem>
              <MenuItem value={10}>10%</MenuItem>
            </Select>
          </Box>
          <Typography fontSize={"18px"} ml={2}>{totalVat.toLocaleString('vi-VN')} VND</Typography>
        </Box>
      </Box>
      
      {/* DÒNG 3 */}
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}>
        {/* Tổng công nợ */}
        <Box sx={{ width: '40%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontSize={"18px"} color='error'>Tổng công nợ :</Typography>
          <Typography fontSize={"18px"} color='error'>{debt.toLocaleString('vi-VN')} VND</Typography>
        </Box>
      
        {/* Tổng phải chi */}
        <Box sx={{ width: '40%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontSize={"18px"}>Tổng phải chi :</Typography>
          <Typography fontSize={"18px"}>{totalPay.toLocaleString('vi-VN')} VND</Typography>
        </Box>
      </Box>    
    </Box>    
  )
}

export default UExpenseModal
