
"use client";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Autocomplete,
    Button,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    InputAdornment
} from "@mui/material";
import { NumericFormat } from 'react-number-format';
import AddIcon from "@mui/icons-material/Add";
import useProductData from '@/app/hooks/useProductData';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from "swr";
import axios from 'axios';
import React, { useState } from "react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';



const AddProductModal: React.FC = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Product>(); // Xác định kiểu dữ liệu cho form
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    }
    const {productData, error, isLoading} = useProductData();
    const [dialogType, setDialogType] = useState<"" | "group" | "unit">("");
    const [inputValue, setInputValue] = useState("");
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

    // Xữ lý mã sản phẩm
    const existingCodes = productData.map(item => item.id_product)
    const generateNextProductCode = (existingCodes: string[]) => {
        if (existingCodes.length === 0) return "SP01"; // Nếu chưa có sản phẩm nào, bắt đầu từ SP01

        // Lấy phần số từ mã sản phẩm (SP01 -> 1, SP09 -> 9, SP100 -> 100)
        const numbers = existingCodes.map(code => parseInt(code.replace("SP", ""), 10));

        // Tìm số lớn nhất
        const maxNumber = Math.max(...numbers);

        // Tăng số đó lên 1
        const nextNumber = maxNumber + 1;

        // Nếu số nhỏ hơn 100, giữ 2 chữ số (01, 02, ..., 99), nếu >= 100 thì không cần 0 ở đầu
        const formattedNumber = nextNumber < 100 ? nextNumber.toString().padStart(2, "0") : nextNumber.toString();
        return `SP${formattedNumber}`;
    };

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
                        }}
                    >
                        Thêm mới hàng hóa
                    </Box>
                    {/* Nội dung */}
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="505px">
                            <CircularProgress />
                        </Box>

                    ) : (<Box component="form" onSubmit={handleSubmit(onSubmit)} display="grid" gridTemplateColumns="1fr 1fr" gap={3} p={3}>
                        <Box display="flex" flexDirection="column">
                            <Typography>Mã Sản Phẩm</Typography>
                            <TextField disabled defaultValue={generateNextProductCode(existingCodes) || []} sx={{ height: 35, '& .MuiInputBase-root': { height: 35 }, borderRadius: 10 }} />
                        </Box>

                        <Box display="flex" flexDirection="column">
                            <Typography fontWeight="bold">Tên Sản Phẩm</Typography>
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
                            <Typography>Nhóm Sản Phẩm</Typography>

                            <Controller
                                name="group"
                                control={control}
                                rules={{
                                    required: "Nhóm sản phẩm không được để trống",
                                    minLength: { value: 2, message: "Nhóm sản phẩm phải có ít nhất 2 ký tự" },
                                    maxLength: { value: 30, message: "Nhóm sản phẩm không được vượt quá 30 ký tự" }
                                }}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        disablePortal
                                        freeSolo
                                        defaultValue={""}
                                        options={getFromLocalStorage("productGroups") || ["Không có kết quả!"]} // Đảm bảo không 
                                        value={field.value || ""}  // 🔹 Luôn có giá trị mặc định
                                        onChange={(_, data) => field.onChange(data)} // Cập nhật giá trị cho form
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                sx={{
                                                    height: 35,
                                                    "& .MuiOutlinedInput-root": {
                                                        paddingRight: "12px !important", // Chừa khoảng trống để không bị đè lên icon
                                                    },
                                                    "& .MuiInputBase-root": { height: 35 },
                                                    borderRadius: 10,
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
                            <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                {errors.group?.message}
                            </Typography>
                        </Box>

                        <Box display="flex" flexDirection="column">
                            <Typography>Đơn Vị Tính</Typography>
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
                                                    height: 35,
                                                    "& .MuiOutlinedInput-root": {
                                                        paddingRight: "12px !important", // Chừa khoảng trống để không bị đè lên icon
                                                    },
                                                    "& .MuiInputBase-root": { height: 35 },
                                                    borderRadius: 10,
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
                            <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                {errors.unit?.message}
                            </Typography>
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <Typography fontWeight="bold">Giá vốn</Typography>
                            <Controller
                                name="costPrice"
                                control={control}
                                rules={{
                                    required: "Giá vốn không được để trống",
                                }}
                                render={({ field }) => (
                                    <NumericFormat
                                        {...field}
                                        value={values.numberformat}
                                        onValueChange={(values) => {
                                            setValues((prevValues) => ({
                                                ...prevValues,
                                                numberformat: values.value,
                                            }));
                                            field.onChange(values.value); // cập nhật giá trị cho form
                                        }}
                                        onFocus={() => {
                                            if (values.numberformat === '0') {
                                              setValues((prev) => ({
                                                ...prev,
                                                numberformat: '',
                                              }));
                                            }
                                          }}
                                          onBlur={() => {
                                            if (values.numberformat === '') {
                                              setValues((prev) => ({
                                                ...prev,
                                                numberformat: '0',
                                              }));
                                            }
                                          }}
                                        customInput={TextField}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        valueIsNumericString
                                        suffix=" VND"
                                        variant="outlined"
                                        sx={{ height: 35, '& .MuiInputBase-root': { height: 35 }, borderRadius: 10 }}
                                    />
                                )}
                            />
                            <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                {errors.costPrice?.message}
                            </Typography>
                        </Box>

                        <Box display="flex" flexDirection="column">
                            <Typography fontWeight="bold">Giá Bán</Typography>
                            <Controller
                                name="salePrice"
                                control={control}
                                rules={{
                                    // required: "Giá bán không được bé hơn giá vốn",
                                }}
                                render={({ field }) => (
                                    <NumericFormat
                                        {...field}
                                        value={valueSale.numberformat}
                                        onValueChange={(valueSaleObj) => {
                                            setValueSale((prev) => ({
                                              ...prev,
                                              numberformat: valueSaleObj.value,
                                            }));
                                            field.onChange(valueSaleObj.value); // cập nhật cho react-hook-form
                                          }}
                                          onFocus={() => {
                                            if (valueSale.numberformat === '0') {
                                              setValueSale((prev) => ({
                                                ...prev,
                                                numberformat: '',
                                              }));
                                            }
                                          }}
                                          onBlur={() => {
                                            if (valueSale.numberformat === '') {
                                              setValueSale((prev) => ({
                                                ...prev,
                                                numberformat: '0',
                                              }));
                                            }
                                        }}

                                        customInput={TextField}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        valueIsNumericString
                                        suffix=" VND"
                                        variant="outlined"
                                        sx={{ height: 35, '& .MuiInputBase-root': { height: 35 }, borderRadius: 10 }}
                                    />
                                )}
                            />
                            <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                                {errors.salePrice?.message}
                            </Typography>
                        </Box>

                        <Box display="flex" flexDirection="column">
                            <Typography>Tồn Kho</Typography>
                            <TextField type="number" sx={{ height: 35, '& .MuiInputBase-root': { height: 35 }, borderRadius: 10 }} />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3, paddingLeft: 4, paddingRight: 4, paddingBottom: 4, mt: 10 }}>
                            {/* Hiển thị lỗi chung nếu có */}
                            {errorForm && (
                                <Typography sx={{ color: "red", textAlign: "center", fontSize: "15px" }}>
                                    {errorForm}
                                </Typography>
                            )}
                            <Button variant="outlined" sx={{ color: "#8DB883", border: "1px solid #8DB883", width: "100px", "&:hover": { backgroundColor: "rgba(141, 184, 131, 0.1)", border: "1px solid #8DB883" } }} onClick={() => {
                                reset(),
                                    setErrorForm(""),
                                    handleClose()
                            }} disabled={isLoading} >Bỏ qua</Button>
                            <Button type="submit" variant="contained" sx={{ bgcolor: "#8DB883", width: "100px", color: 'white' }} disabled={loading}>{loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Lưu"}</Button>
                        </Box>
                    </Box>)}
                </Box>
            </Modal>

            <Dialog open={dialogType === "group"} onClose={handleCloseDialog}>
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
            </Dialog>

            <Dialog open={dialogType === "unit"} onClose={handleCloseDialog}>
                <DialogTitle>Thêm Đơn Vị Tính</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        placeholder="Nhập Đơn Vị Tính"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: "red" }}>Hủy</Button>
                    <Button onClick={() => addUnitType(inputValue)} sx={{ bgcolor: "#8DB883", color: "#fff" }}>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
            </Box>
        </>
    )
}

export default AddProductModal;