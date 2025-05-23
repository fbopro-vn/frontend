
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
import React, { useState, useEffect } from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import User from '@/app/api/User/User.json'
import { parse, format } from 'date-fns';

const UpdateProductModal = ({
    checkedRows, data }: {
        checkedRows: Record<string, boolean>
        data: typeof User
    }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Product>(); // Xác định kiểu dữ liệu cho form

    const [openUpdateUser, setOpenUpdateUser] = useState(false);
    const handleOpenUpdateUser = () => {
        setOpenUpdateUser(true);
    }
    const handleCloseUpdateUser = () => {
        setOpenUpdateUser(false)
    }

    const [openAddRole, setOpenAddRole] = useState(false);
    const handleOpenAddRole = () => {
        setOpenAddRole(true);
    }
    const handleCloseAddRole = () => {
        setOpenAddRole(false)
    }

    const selectedCount = Object.values(checkedRows).filter(Boolean).length;
    const isDisabled = selectedCount !== 1;
    const selectedUsertId = Object.keys(checkedRows).find(
        (id) => checkedRows[id]
      );
   

    const { productData, error, isLoading } = useProductData();
    const [dialogType, setDialogType] = useState<"" | "group" | "unit">("");
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = React.useState(false);
    const [errorForm, setErrorForm] = React.useState("");

    // dialog
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
    const addUnitType = (newUnit: string) => {
        if (!newUnit.trim()) return; // Không lưu nếu rỗng

        const storedUnits = getFromLocalStorage("unitTypes") || [];

        if (storedUnits.includes(newUnit)) {
            alert(`Đơn vị tính "${newUnit}" đã tồn tại!`);
            return;
        }

        const updatedUnits = [...storedUnits, newUnit];
        saveToLocalStorage("unitTypes", updatedUnits);
        handleCloseDialog()
    };

    const addProductGroup = (newGroup: string) => {
        if (!newGroup.trim()) return; // Không lưu nếu rỗng

        const storedGroups = getFromLocalStorage("productGroups") || [];

        if (storedGroups.includes(newGroup)) {
            alert(`Nhóm sản phẩm "${newGroup}" đã tồn tại!`);
            return;
        }

        const updatedGroups = [...storedGroups, newGroup];
        saveToLocalStorage("productGroups", updatedGroups);
        handleCloseDialog();
    };

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
            handleCloseUpdateUser();
        } catch (err) {
            console.error("Lỗi khi lưu khách hàng", err);
            setErrorForm("Không thể lưu khách hàng, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (openUpdateUser && selectedUsertId) {
          const selectedData = data.find((item) => item._id === selectedUsertId);
          if (!selectedData) return;
            console.log("data dưc chọn", selectedData)
              // Parse từ chuỗi "dd/MM/yyyy" sang Date
            const parsedDate = parse(selectedData.birthday, 'dd/MM/yyyy', new Date());

            // Format lại thành chuỗi "yyyy-MM-dd" để hiển thị lên input type="date"
            const formattedDate = format(parsedDate, 'yyyy-MM-dd');
          reset({
            username: selectedData.username || "",
            fullname: selectedData.fullname || "",
            phone: selectedData.phone || "",
            email: selectedData.email || "",
            role_name: selectedData.role_name || "",
            birthday: formattedDate || ""
          });
        }
      }, [openUpdateUser]);
      

    return (
        <Box>
        {/* Button */}
        <Button sx={{ 
            bgcolor: '#8DB883', 
            color: 'white', 
            width: "100px" }} 
            startIcon={<SettingsOutlinedIcon />} 
            onClick={handleOpenUpdateUser}
            disabled={isDisabled}
            >Sửa</Button>

        <Modal open={openUpdateUser} onClose={handleCloseUpdateUser}>
            <Box sx={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 900, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 2 }}>
                {/* Tiêu đề */}
                <Box
                    sx={{
                        backgroundColor: "#8DB883", // Nền đỏ
                        textAlign: "center", // Căn giữa chữ
                        color: "white", // Chữ trắng
                        fontWeight: "bold",
                        fontSize: "18px",
                        p: 3,
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

                    <IconButton onClick={handleCloseUpdateUser}>
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
                                    {...register("username", {
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
                                    {...register("fullname", {
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
                                    {...register("password", {
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
                                    {...register("phone", {
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
                                    {...register("re_password", {
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
                                    {...register("email", {
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
                                    name="role_name"
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
                                    {...register("birthday", {
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
        <Modal open={openAddRole} onClose={handleCloseAddRole}>
            <Box>
                Hello 
            </Box>
        </Modal>
    </Box>
    )
}

export default UpdateProductModal;