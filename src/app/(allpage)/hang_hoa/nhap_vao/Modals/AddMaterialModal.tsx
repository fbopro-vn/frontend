"use client";

import React, { useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import { useForm, Controller } from "react-hook-form";

import useProductData from "@/app/hooks/useProductData";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";

import AddIcon from "@mui/icons-material/Add";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";



const  AddMaterialModal: React.FC = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Material>(); // Xác định kiểu dữ liệu cho form
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    }
    
    const {productData, error, isLoading} = useProductData("http://api.fbopro.vn/v1/products");
    const [dialogType, setDialogType] = useState<"" | "group" | "unit">("");
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorForm, setErrorForm] = useState("");


    // Xữ lý mã vật tư
    const existingCodes = productData.map(item => item.id)
    const generateNextMaterialCode = (existingCodes: string[]) => {
        if (existingCodes.length === 0) return "SP01"; // Nếu chưa có vật tư nào, bắt đầu từ SP01

        // Lấy phần số từ mã vật tư (SP01 -> 1, SP09 -> 9, SP100 -> 100)
        const numbers = existingCodes.map(code => parseInt(code.replace("SP", ""), 10));

        // Tìm số lớn nhất
        const maxNumber = Math.max(...numbers);

        // Tăng số đó lên 1
        const nextNumber = maxNumber + 1;

        // Nếu số nhỏ hơn 100, giữ 2 chữ số (01, 02, ..., 99), nếu >= 100 thì không cần 0 ở đầu
        const formattedNumber = nextNumber < 100 ? nextNumber.toString().padStart(2, "0") : nextNumber.toString();
        return `SP${formattedNumber}`;
    };

    const handleOpenDialog = (type: "group" | "unit") => {
        setDialogType(type);
        setInputValue("");
      };
      
      const handleCloseDialog = () => setDialogType("");
      

    // Hàm Lưu giá trị xuống local storage
    const saveToLocalStorage = (key: string, value: any) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    // Hàm Lấy giá trị từ localstorage
    const getFromLocalStorage = (key: string): any => {
        if (typeof window !== "undefined") {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : null;
        }
        return null;
    };
    // Hàm thêm nhóm hoặc đơn vị tính Lưu xuống localstorage

    const addMaterialGroup = (newGroup: string) => {
        if (!newGroup.trim()) return; // Không lưu nếu rỗng

        const storedGroups = getFromLocalStorage("material_group") || [];

        if (storedGroups.includes(newGroup)) {
            alert(`Nhóm vật tư "${newGroup}" đã tồn tại!`);
            return;
        }

        const updatedGroups = [...storedGroups, newGroup];
        saveToLocalStorage("material_group", updatedGroups);
        handleCloseDialog();
    };

    const addMaterialUnit = (newUnit: string) => {
        if (!newUnit.trim()) return; // Không lưu nếu rỗng

        const storedUnits = getFromLocalStorage("material_unit") || [];

        if (storedUnits.includes(newUnit)) {
            alert(`Đơn vị tính "${newUnit}" đã tồn tại!`);
            return;
        }

        const updatedUnits = [...storedUnits, newUnit];
        saveToLocalStorage("material_unit", updatedUnits);
        handleCloseDialog();
    };


    const onSubmit = async (data: Material) => {
        setLoading(true);
        setErrorForm("");
        try {
            console.log("Dữ liệu gửi đi", {

                name: data.name,
                material_group: data.material_group,
                unit: data.unit,
                costPrice: Number(String(data.costPrice).replace(/\D/g, "")),
                salePrice: Number(String(data.salePrice).replace(/\D/g, "")) ?? 0,
                stockQuantity: data.stockQuantity ?? 0,
                stock_in: 0,
                stock_out: 0,
            }
            )
            const response = await axios.post("http://192.168.1.203:8000/qlybanhang/add-cate", {
                name: data.name,
                material_group: data.material_group,
                unit: data.unit,
                costPrice: Number(String(data.costPrice).replace(/\D/g, "")),
                salePrice: Number(String(data.salePrice).replace(/\D/g, "")) ?? 0,
                stockQuantity: data.stockQuantity ?? 0,
                stock_in: 0,
                stock_out: 0,
            }, {
                headers: { "Content-Type": "application/json" }
            });

            mutate("http://192.168.1.203:8000/qlybanhang/cate")
            handleClose();
        } catch (err) {
            console.error("Lỗi khi lưu khách hàng", err);
            setErrorForm("Không thể lưu khách hàng, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box>
            {/* Button */}
            <Button sx={{ bgcolor: '#8DB883', color: 'white',  width: "100px" }} startIcon={<AddOutlinedIcon/>} onClick={handleOpen}>Thêm</Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ 
                    position: 'absolute', 
                    top: '50%', left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    bgcolor: 'background.paper', 
                    minWidth: '500px',
                    boxShadow: 24, 
                    borderRadius: 2 }}>
                    {/* Tiêu đề */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: "#8DB883", // Nền đỏ                        
                            p: 3,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            color: "white",
                        }}
                    >
                        <Typography sx={{
                            fontWeight: "bold",
                            fontSize: "20px",
                             // Chữ trắng
                        }}>Thêm mới vật tư</Typography>
                        <IconButton onClick={() => {
                            reset(),
                            setErrorForm(""),
                            handleClose()
                        }}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    {/* Nội dung */}
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="505px">
                            <CircularProgress />
                        </Box>

                    ) : (<Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        
                        <Box display='flex' flexDirection='column' gap={2} p={2}>
                            <Box display="flex" flexDirection="column" mb='20px'>
                                <Typography fontWeight='bold'>Mã vật tư</Typography>
                                <TextField 
                                    disabled 
                                    defaultValue={generateNextMaterialCode(existingCodes) || []}
                                    sx={{ 
                                        '& .MuiInputBase-root': { height: 40 }, borderRadius: 2 }} />
                            </Box>

                            <Box display="flex" flexDirection="column">
                                <Typography fontWeight='bold'>Tên vật tư</Typography>
                                <TextField
                                    {...register("material_name", {
                                        required: "Tên vật tư không được để trống",
                                        minLength: { value: 3, message: "Tên phải có ít nhất 3 ký tự" },
                                        maxLength: { value: 50, message: "Tên không được vượt quá 50 ký tự" }
                                    })}
                                    sx={{ '& .MuiInputBase-root': { height: 40, borderRadius: 2 } }}

                                />
                                <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red" }}>
                                    {errors.material_name?.message}
                                </Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography fontWeight='bold'>Nhóm vật tư</Typography>

                                <Controller
                                    name="material_group"
                                    control={control}
                                    rules={{
                                        required: "Nhóm vật tư không được để trống",
                                        minLength: { value: 2, message: "Nhóm vật tư phải có ít nhất 2 ký tự" },
                                        maxLength: { value: 30, message: "Nhóm vật tư không được vượt quá 30 ký tự" }
                                    }}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            disablePortal
                                            freeSolo
                                            defaultValue={""}
                                            options={getFromLocalStorage("materialGroups") || ["Không có kết quả!"]} // Đảm bảo không 
                                            value={field.value || ""}  // 🔹 Luôn có giá trị mặc định
                                            onChange={(_, data) => field.onChange(data)} // Cập nhật giá trị cho form
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    sx={{
                                                
                                                        "& .MuiOutlinedInput-root": {
                                                            paddingRight: "12px !important", // Chừa khoảng trống để không bị đè lên icon
                                                        },
                                                        "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                                                    
                                                    }}
                                                    InputProps={{
                                                        ...params.InputProps, // ⚠️ Giữ lại `InputProps` gốc của Autocomplete
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {params.InputProps?.endAdornment} {/* Giữ lại dropdown mặc định */}
                                                                <IconButton onClick={() => handleOpenDialog("group")} edge="end">
                                                                    <AddIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    )}
                                />
                                <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red" }}>
                                    {errors.material_group?.message}
                                </Typography>
                            </Box>

                            <Box display="flex" flexDirection="column">
                                <Typography fontWeight='bold'>Đơn vị tính</Typography>

                                <Controller
                                    name="unit"
                                    control={control}
                                    rules={{
                                        required: "Đơn vị tính không được để trống",
                                        minLength: { value: 2, message: "Đơn vị tính phải có ít nhất 2 ký tự" },
                                        maxLength: { value: 30, message: "Đơn vị tính không được vượt quá 30 ký tự" }
                                    }}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            disablePortal
                                            freeSolo
                                            defaultValue={""}
                                            options={getFromLocalStorage("materialUnit") || ["Không có kết quả!"]} // Đảm bảo không 
                                            value={field.value || ""}  // 🔹 Luôn có giá trị mặc định
                                            onChange={(_, data) => field.onChange(data)} // Cập nhật giá trị cho form
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    sx={{
                                                
                                                        "& .MuiOutlinedInput-root": {
                                                            paddingRight: "12px !important", // Chừa khoảng trống để không bị đè lên icon
                                                        },
                                                        "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                                                    
                                                    }}
                                                    InputProps={{
                                                        ...params.InputProps, // ⚠️ Giữ lại `InputProps` gốc của Autocomplete
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {params.InputProps?.endAdornment} {/* Giữ lại dropdown mặc định */}
                                                                <IconButton onClick={() => handleOpenDialog("unit")} edge="end">
                                                                    <AddIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    )}
                                />
                                <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red" }}>
                                    {errors.unit?.message}
                                </Typography>
                            </Box>

                            <Box display="flex" flexDirection="column">
                                <Typography fontWeight='bold'>Nhà cung cấp</Typography>

                                <Controller
                                    name="provider_name"
                                    control={control}
                                    rules={{
                                        required: "Nhà cung cấp không được để trống",
                                        minLength: { value: 2, message: "Nhà cung cấp phải có ít nhất 2 ký tự" },
                                        maxLength: { value: 30, message: "Nhà cung cấp không được vượt quá 30 ký tự" }
                                    }}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            disablePortal
                                            freeSolo
                                            defaultValue={""}
                                            options={getFromLocalStorage("materialUnit") || ["Không có kết quả!"]} // Đảm bảo không 
                                            value={field.value || ""}  // 🔹 Luôn có giá trị mặc định
                                            onChange={(_, data) => field.onChange(data)} // Cập nhật giá trị cho form
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    sx={{
                                                
                                                        "& .MuiOutlinedInput-root": {
                                                            paddingRight: "12px !important", // Chừa khoảng trống để không bị đè lên icon
                                                        },
                                                        "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                                                    
                                                    }}
                                                    InputProps={{
                                                        ...params.InputProps, // ⚠️ Giữ lại `InputProps` gốc của Autocomplete
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {params.InputProps?.endAdornment} {/* Giữ lại dropdown mặc định */}
                                                                <IconButton onClick={() => handleOpenDialog("unit")} edge="end">
                                                                    <AddIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    )}
                                />
                                <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red" }}>
                                    {errors.provider_name?.message}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3, paddingLeft: 4, paddingRight: 4, paddingBottom: 4, mt: 10 }}>
                            {/* Hiển thị lỗi chung nếu có */}
                            {errorForm && (
                                <Typography sx={{ color: "red", textAlign: "center", fontSize: "15px" }}>
                                    {errorForm}
                                </Typography>
                            )}
                            <Button type="submit" variant="contained" sx={{ bgcolor: "#8DB883", width: "100px", color: 'white' }} disabled={loading}>{loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Lưu"}</Button>
                        </Box>
                    </Box>)}
                </Box>
            </Modal>

            <Dialog open={dialogType === "group"} onClose={handleCloseDialog}>
                <DialogTitle>Thêm nhóm vật tư</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        placeholder="Nhập nhóm vật tư"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: "red" }}>Hủy</Button>
                    <Button onClick={() => addMaterialGroup(inputValue)} sx={{ bgcolor: "#8DB883", color: "#fff" }}>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={dialogType === "unit"} onClose={handleCloseDialog}>
                <DialogTitle>Thêm đơn vị tính</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        placeholder="Nhập đơn vị tính"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: "red" }}>Hủy</Button>
                    <Button onClick={() => addMaterialUnit(inputValue)} sx={{ bgcolor: "#8DB883", color: "#fff" }}>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
            </Box>
        </>
    )
}

export default  AddMaterialModal;