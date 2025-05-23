
"use client";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Autocomplete,
    Button,
    IconButton,
    CircularProgress,
    InputAdornment
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useProductData from '@/app/hooks/useProductData';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from "swr";
import axios from 'axios';
import React, { useState } from "react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddRoleModal from './AddRoleModal'


const AddUserModal: React.FC = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Product>(); // Xác định kiểu dữ liệu cho form

    const [openAddUser, setOpenAddUser] = useState(false);
    const handleOpenAddUser = () => {
        setOpenAddUser(true);
    }
    const handleCloseAddUser = () => {
        setOpenAddUser(false)
    }

    const [openAddRole, setOpenAddRole] = useState(false);
    const handleOpenAddRole = () => {
        setOpenAddRole(true);
    }
    const { productData, error, isLoading } = useProductData();
    const [loading, setLoading] = React.useState(false);
    const [errorForm, setErrorForm] = React.useState("");
    const [values, setValues] = React.useState({
        textmask: '(100) 000-0000',
        numberformat: '0',
    });

    const [valueSale, setValueSale] = React.useState({
        textmask: '(100) 000-0000',
        numberformat: '0',
    });

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


    // const addRole = (newGroup: string) => {
    //     if (!newGroup.trim()) return; // Không lưu nếu rỗng

    //     const storedGroups = getFromLocalStorage("productGroups") || [];

    //     if (storedGroups.includes(newGroup)) {
    //         alert(`Nhóm sản phẩm "${newGroup}" đã tồn tại!`);
    //         return;
    //     }

    //     const updatedGroups = [...storedGroups, newGroup];
    //     saveToLocalStorage("productGroups", updatedGroups);
    //     handleCloseDialog();
    // };

    const onSubmit = async (data: Product) => {
        setLoading(true);
        setErrorForm("");
        try {
            console.log("Dữ liệu gửi đi", {

                name: data.name,
                group: data.group,
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
                group: data.group,
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
            handleCloseAddUser();
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
                <Button sx={{ bgcolor: '#8DB883', color: 'white' }} startIcon={<AddOutlinedIcon />} onClick={handleOpenAddUser}>Thêm người dùng</Button>

                <Modal open={openAddUser} onClose={handleCloseAddUser}>
                    <Box sx={{ 
                        position: 'absolute', 
                        top: '40%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: 900, 
                        bgcolor: 'background.paper', 
                        boxShadow: 24, 
                        borderRadius: 2 }}>
                        {/* Tiêu đề */}
                        <Box
                            sx={{
                                backgroundColor: "#8DB883", // Nền đỏ
                                textAlign: "center", // Căn giữa chữ
                                color: "white", // Chữ trắng
                                fontWeight: "bold",
                                fontSize: "18px",
                                px: 2,
                                minHeight: '50px',
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography sx={{
                                fontSize: '20px',
                                fontWeight: 'bold'
                            }}>
                                Thêm người dùng
                            </Typography>

                            <IconButton onClick={handleCloseAddUser}>
                                <CloseIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Box>
                        {/* Nội dung */}
                        {isLoading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="505px">
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                {/* FORM NHẬP DỮ LIỆU */}
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit(onSubmit)}
                                    display="grid"
                                    gridTemplateColumns="1fr 1fr"
                                    gap={3}
                                    p={3}
                                >
                                    <Box display="flex" flexDirection="column">
                                        <Typography>Tên đăng nhập</Typography>
                                        <TextField
                                            {...register("name", {
                                                required: "Tên khách hàng không được để trống",
                                                minLength: { value: 3, message: "Tên phải có ít nhất 3 ký tự" },
                                                maxLength: { value: 50, message: "Tên không được vượt quá 50 ký tự" }
                                            })}
                                            sx={{ '& .MuiInputBase-root': { height: 40, borderRadius: 2 } }}

                                        />
                                        <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                            {errors.name?.message}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" flexDirection="column">
                                        <Typography>Họ và tên</Typography>
                                        <TextField
                                            {...register("name", {
                                                required: "Tên khách hàng không được để trống",
                                                minLength: { value: 3, message: "Tên phải có ít nhất 3 ký tự" },
                                                maxLength: { value: 50, message: "Tên không được vượt quá 50 ký tự" }
                                            })}
                                            sx={{ '& .MuiInputBase-root': { height: 40, borderRadius: 2 } }}

                                        />
                                        <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                            {errors.name?.message}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" flexDirection="column">
                                        <Typography>Mật khẩu</Typography>
                                        <TextField
                                            type="password"
                                            {...register("name", {
                                                required: "Tên khách hàng không được để trống",
                                                minLength: { value: 3, message: "Tên phải có ít nhất 3 ký tự" },
                                                maxLength: { value: 50, message: "Tên không được vượt quá 50 ký tự" }
                                            })}
                                            sx={{ '& .MuiInputBase-root': { height: 40, borderRadius: 2 } }}

                                        />
                                        <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                            {errors.name?.message}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" flexDirection="column">
                                        <Typography>Số điện thoại</Typography>
                                        <TextField
                                            {...register("name", {
                                                required: "Tên khách hàng không được để trống",
                                                minLength: { value: 3, message: "Tên phải có ít nhất 3 ký tự" },
                                                maxLength: { value: 50, message: "Tên không được vượt quá 50 ký tự" }
                                            })}
                                            sx={{ '& .MuiInputBase-root': { height: 40, borderRadius: 2 } }}

                                        />
                                        <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                            {errors.name?.message}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" flexDirection="column">
                                        <Typography>Nhập lại mật khẩu</Typography>
                                        <TextField
                                            type="password"
                                            {...register("name", {
                                                required: "Tên khách hàng không được để trống",
                                                minLength: { value: 3, message: "Tên phải có ít nhất 3 ký tự" },
                                                maxLength: { value: 50, message: "Tên không được vượt quá 50 ký tự" }
                                            })}
                                            sx={{ '& .MuiInputBase-root': { height: 40, borderRadius: 2 } }}

                                        />
                                        <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                            {errors.name?.message}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" flexDirection="column">
                                        <Typography>Email</Typography>
                                        <TextField
                                            type="email"
                                            {...register("name", {
                                                required: "Tên khách hàng không được để trống",
                                                minLength: { value: 3, message: "Tên phải có ít nhất 3 ký tự" },
                                                maxLength: { value: 50, message: "Tên không được vượt quá 50 ký tự" }
                                            })}
                                            sx={{ '& .MuiInputBase-root': { height: 40, borderRadius: 2 } }}

                                        />
                                        <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                            {errors.name?.message}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" flexDirection="column">
                                        <Typography>Vai trò</Typography>
                                        <Controller
                                            name="unit"
                                            control={control}
                                            rules={{
                                                required: "Đơn vị tính không được để trống",

                                            }}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    disablePortal
                                                    freeSolo
                                                    defaultValue={""}
                                                    options={getFromLocalStorage("unitTypes") || ["Không có kết quả!"]} // Đảm bảo không 
                                                    value={field.value || ""}  // 🔹 Luôn có giá trị mặc định
                                                    onChange={(_, data) => field.onChange(data)} // Cập nhật giá trị cho form
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            sx={{
                                                                height: 40,
                                                                "& .MuiOutlinedInput-root": {
                                                                    paddingRight: "12px !important", // Chừa khoảng trống để không bị đè lên icon
                                                                },
                                                                "& .MuiInputBase-root": { height: 40, borderRadius: '8px !important' },
                                                              
                                                            }}
                                                            InputProps={{
                                                                ...params.InputProps, // ⚠️ Giữ lại `InputProps` gốc của Autocomplete
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        {params.InputProps?.endAdornment} {/* Giữ lại dropdown mặc định */}
                                                                        <IconButton onClick={() => handleOpenAddRole()} edge="end">
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
                                        <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                            {errors.name?.message}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" flexDirection="column">
                                        <Typography>Ngày sinh</Typography>
                                        <TextField
                                            type="date"
                                            {...register("name", {
                                                required: "Tên khách hàng không được để trống",
                                                minLength: { value: 3, message: "Tên phải có ít nhất 3 ký tự" },
                                                maxLength: { value: 50, message: "Tên không được vượt quá 50 ký tự" }
                                            })}
                                            sx={{ '& .MuiInputBase-root': { height: 40, borderRadius: 2 } }}

                                        />
                                        <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                            {errors.name?.message}
                                        </Typography>
                                    </Box>

                                    {/* ✅ Nút Lưu nằm cuối form, canh phải */}
                                    <Box
                                        sx={{
                                            gridColumn: "1 / -1",
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            mt: 1
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                bgcolor: "#8DB883",
                                                color: 'white',
                                                width: "100px",
                                                '&:hover': {
                                                    bgcolor: "#77a56d"
                                                }
                                            }}
                                        >
                                            Lưu
                                        </Button>
                                    </Box>
                                </Box>

                            </>)}
                    </Box>
                </Modal>

                {/* <Dialog open={dialogType === "group"} onClose={handleCloseDialog}>
                    <DialogTitle>Thêm Nhóm Sản Phẩm</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            placeholder="Nhập Nhóm Sản Phẩm"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} sx={{ color: "red" }}>Hủy</Button>
                        <Button onClick={() => addProductGroup(inputValue)} sx={{ bgcolor: "#8DB883", color: "#fff" }}>
                            Thêm
                        </Button>
                    </DialogActions>
                </Dialog> */}

                {/* Ở bên file khác */}
                <AddRoleModal open={openAddRole} onClose={() => setOpenAddRole(false)} />
            </Box>
        </>
    )
}

export default AddUserModal;