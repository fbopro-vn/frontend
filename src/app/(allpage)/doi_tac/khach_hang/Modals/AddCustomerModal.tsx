"use client";
import * as React from "react";
import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CircularProgress from "@mui/material/CircularProgress";
import useCustomerData from "@/app/hooks/useCustomerData";
import { toast } from "react-toastify";

// Định nghĩa kiểu dữ liệu cho form
interface Inputs {
    name: string;
    phone: string;
    address: string;
}

const AddCustomerModal: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>(); // Xác định kiểu dữ liệu cho form

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const { mutate } = useCustomerData('http://api.fbopro.vn/v1/customers')
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        reset();
        setError("");
    };

    const onSubmit = async (data: Inputs) => {
        setLoading(true);
        setError("");
        try {

            console.log("Dữ liệu gửi đi", {

                name: data.name,
                phone: "'" + data.phone,
                address: data.address
            }

            )
            // Lấy token từ localStorage hoặc nơi bạn lưu trữ token
        const token = localStorage.getItem("access_token"); // Hoặc bất kỳ nơi nào bạn lưu trữ token

        // Gửi yêu cầu POST với token trong header
        const response = await axios.post("http://api.fbopro.vn/v1/customers", {
            name: data.name,
            phone: data.phone,
            address: data.address
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Thêm token vào header Authorization
            }
        });
            toast.success("Thêm khách hàng thành công!");
            mutate()
            handleClose();
        } catch (err) {
            console.error("Lỗi khi lưu khách hàng", err);
            setError("Không thể lưu khách hàng, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button sx={{ bgcolor: '#8DB883', color: 'white',  width: "100px" }} startIcon={<AddOutlinedIcon/>} onClick={handleOpen}>Thêm</Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 2 }}>
                    <Box sx={{ backgroundColor: "#8DB883", textAlign: "center", color: "white", fontWeight: "bold", fontSize: "18px", p: 3, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                        Thêm Khách Hàng
                    </Box>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3} p={3}>
                        <Box display="flex" flexDirection="column">
                            <Typography fontWeight="bold">Tên Khách Hàng</Typography>
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
                            <Typography fontWeight="bold">Số Điện Thoại</Typography>
                            <TextField
                                {...register("phone", {
                                    required: "Số điện thoại không được để trống",
                                    pattern: { value: /^\d{10,11}$/, message: "Số điện thoại phải có 10-11 chữ số" }
                                })}
                                sx={{ '& .MuiInputBase-root': { height: 40, borderRadius: 2 } }}
        
                            />
      <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                    {errors.phone?.message}
                </Typography>
                        </Box>

                        <Box display="flex" flexDirection="column">
                            <Typography fontWeight="bold">Địa Chỉ</Typography>
                            <TextField
                                {...register("address", {
                                    required: "Địa chỉ không được để trống",
                                    minLength: { value: 5, message: "Địa chỉ phải có ít nhất 5 ký tự" },
                                    maxLength: { value: 100, message: "Địa chỉ không được vượt quá 100 ký tự" }
                                })}
                                multiline
                                rows={3}
                                sx={{ '& .MuiInputBase-root': { borderRadius: 2 } }}
    
                            />
    <Typography sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}>
                    {errors.address?.message}
                </Typography>
                        </Box>
                    
                       

                        {/* Hiển thị lỗi chung nếu có */}
            {error && (
                <Typography sx={{ color: "red", textAlign: "center", fontSize: "15px" }}>
                    {error}
                </Typography>
            )}

                        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3, paddingLeft: 4, paddingRight: 4, paddingBottom: 4 }}>
                            <Button variant="outlined" sx={{ color: "#8DB883", border: "1px solid #8DB883", width: "100px", "&:hover": { backgroundColor: "rgba(141, 184, 131, 0.1)", border: "1px solid #8DB883" } }} onClick={handleClose} disabled={loading}>Bỏ qua</Button>
                            <Button type="submit" variant="contained" sx={{ bgcolor: "#8DB883", width: "100px",color: 'white' }} disabled={loading}>{loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Lưu"}</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default AddCustomerModal;
