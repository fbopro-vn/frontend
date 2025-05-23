'use client'

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CExpenseModal from "./CExpenseModal";
import UExpenseModal from "./UExpenseModal";
import { useDispatch } from "react-redux";
import { addMaterial, resetPurchase } from "@/app/redux/features/Purchase/PurchaseSlice"; // đúng path nhé
import { toast } from 'react-toastify';
import {   
  selectSelectedMaterials,
} from "@/app/redux/store/selectors/purchaseSelector";
import { useSelector } from "react-redux";
import AddMaterialModal from './AddMaterialModal'
import useHandlerPurchaseSubmit from '@/app/hooks/Purchase/useHandlerPurchaseSubmit';
import Material from '@/app/api/Merchandise/BodyMerchandiseInput.json'

const ExpenseModal = () => {
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [openAddMaterialModal, setOpenAddMaterialModal] = useState(false);
  const [valueMaterial, setValueMaterial] = useState(null); // Quản lý giá trị được chọn
  const [inputValueMaterial, setInputValueMaterial] = useState(""); // Quản lý nội dung ô nhập
  const handleOpen = () => setOpenExpenseModal(true);
  const handleClose = () => setOpenExpenseModal(false);
  const handleOpenAdd = () => setOpenAddMaterialModal(true);
  const handleCloseAdd = () => setOpenAddMaterialModal(false);
  // Lấy dữ liệu từ Redux
  const dispatch = useDispatch(); 
  const materialList = useSelector(selectSelectedMaterials);
  const {handleSubmit, isLoading } = useHandlerPurchaseSubmit()
  return (
    <Box>
      <Button
        sx={{
          minWidth: "190px",
          bgcolor: "#8DB883",
          color: "white"
        }}
        onClick={handleOpen}
      >
        Thêm dữ liệu
      </Button>


<Modal open={openExpenseModal} onClose={handleClose}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70vw',
      height: '92vh',
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 24,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}
  >
    {/* Header */}
    <Box
      sx={{
        bgcolor: "#8DB883",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', 
        color: 'white',
        px: 2,
        minHeight: "50px"
      }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: 'bold', textTransform: 'uppercase' }}>
        Thêm dữ liệu danh mục
      </Typography>
      <IconButton sx={{ color: 'white' }} onClick={handleClose}>
        <CloseIcon sx={{ fontSize: "30px" }} />
      </IconButton>
    </Box>

    {/* Content */}
    <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
        <Autocomplete
          disablePortal
          sx={{ width: 350 }}
          options={Material}
          getOptionLabel={(option) => option.material_name}
          value={valueMaterial}
          inputValue={inputValueMaterial}
          onChange={(_, newValue) => {
            if (newValue) {
              const isExist = materialList.some(item => item.material_id === newValue.material_id);
          
              if (isExist) {
                // 👇 Toast ở đây
                toast.error(`Mã vật tư ${newValue.material_id} đã tồn tại!`);
                  setValueMaterial(null);
                  setInputValueMaterial("");
                return;
              }
          
              dispatch(addMaterial({
                material_id: newValue.material_id,
                material_name: newValue.material_name
              }));
          
              setValueMaterial(null);
              setInputValueMaterial("");
            }
          }}
          
          
          onInputChange={(_, newInputValue) => setInputValueMaterial(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Tìm kiếm vật tư"
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  height: 40,
                  bgcolor: "white"
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                }
              }}
            />
          )}
          slotProps={{
            listbox: {
              sx: {
                minHeight: "340px", // Giữ chiều cao cố định
                maxHeight: "340px", // Đảm bảo không bị co lại
                overflowY: "auto",
                marginBottom: '55px',
                position: "relative",
              },
              component: (props) => (
                <Box {...props} position="relative">
                  {props.children}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      // padding: "10px",
                      position: "fixed",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      backgroundColor: "white",
                      boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
                      zIndex: 1500,
                    }}
                  >
                    <Button fullWidth  sx={{
                      height: '50px',
                      bgcolor: "#8DB883",
                      border: "transparent",
                      color: "#fff",
                    }}
                    startIcon={<AddIcon/>}
                    onClick={handleOpenAdd}
                    >Thêm vật tư</Button>
                  </Box>
                </Box>
              ),
            },
          }}
          noOptionsText={ <NoOptionsMessage handleOpenAdd={handleOpenAdd}/>}
        />

          <AddMaterialModal open={openAddMaterialModal} handleClose={handleCloseAdd}/>
        
          <Tooltip title="Xóa mẫu">
            <IconButton onClick={() => dispatch(resetPurchase())}>
              <ViewDayOutlinedIcon />
            </IconButton>
          </Tooltip>
          </Box>
      <Box mt="20px">
        <CExpenseModal />
        <UExpenseModal />
      </Box>
    </Box>

    {/* Footer */}
    <Box sx={{ px: 3, pb: 3, textAlign: 'right' }}>
      <Button
        sx={{
          bgcolor: '#8DB883',
          color: 'white',
          minWidth: "100px"
        }}
        startIcon={<CheckCircleOutlineOutlinedIcon />}
        onClick={handleSubmit}
      >
        {isLoading ? "Đang gửi..." : "Xác nhận"}
      </Button>
    </Box>
  </Box>
</Modal>

    </Box>
  );
};

export default ExpenseModal;



// ✅ Chỉnh sửa NoOptionsMessage đúng kích thước
const NoOptionsMessage = ({ handleOpenAdd }: { handleOpenAdd: () => void}) => (
  <Box
    sx={{
      minHeight: "130px", // Đảm bảo độ cao giống listbox khi có kết quả
      display: "flex",
      alignItems: "top",
      flexDirection: "column",
      position: "relative",
    }}
  >
    {/* <Typography>{isLoading ? "Vui lòng chờ..." : "Không có kết quả!"}</Typography> */}
    {/* Test */}
    <Typography>Không có kết quả!</Typography>
    {/* Giữ vị trí y như nút khi có kết quả */}
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1500,
      }}
    >
      <Button
        fullWidth
        sx={{
          height: "50px",
          bgcolor: "#8DB883",
          border: "transparent",
          color: "#fff",
        }}
        onClick={handleOpenAdd}
        startIcon={<AddIcon/>}
      >
        Thêm vật tư
      </Button>
    </Box>
  </Box>
);
