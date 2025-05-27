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
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useForm } from "react-hook-form";
import useRoleData from "@/app/hooks/useRoleData";
import useUserData from "@/app/hooks/useUserData";
import axios from "axios";
import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddRoleModal from "./AddRoleModal";

interface UserForm {
  username: string;
  fullname: string;
  password: string;
  rePassword: string;
  phone: string;
  email: string;
  role: string;
  birthday: string;
}

const AddUserModal: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<UserForm>({
    defaultValues: {
      username: "",
      fullname: "",
      password: "",
      rePassword: "",
      phone: "",
      email: "",
      role: "",
      birthday: "",
    },
  });

  const [openAddUser, setOpenAddUser] = useState(false);
  const handleOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => {
    setOpenAddUser(false);
    reset();
  };

  const { roleData } = useRoleData("http://api.sdc.com:8000/v1/roles");
const { mutate } = useUserData("http://api.sdc.com:8000/v1/users");
  const [openAddRole, setOpenAddRole] = useState(false);
  const handleOpenAddRole = () => setOpenAddRole(true);

  const [loading, setLoading] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  // Kiểm tra confirm password
  const passwordValue = watch("password");

const onSubmit = async (data: UserForm) => {
  setLoading(true);
  setErrorForm("");

  if (data.password !== data.rePassword) {
    setErrorForm("Mật khẩu và Nhập lại mật khẩu không khớp");
    setLoading(false);
    return;
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  try {
    await axios.post(
      "http://api.sdc.com:8000/v1/users",
      {
        username: data.username,
        fullname: data.fullname,
        password: data.password,
        phone: data.phone,
        email: data.email,
        role: data.role,
        birthday: data.birthday,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    mutate();
    handleCloseAddUser();
  } catch (err) {
    console.error("Lỗi khi lưu người dùng", err);
    setErrorForm("Không thể lưu người dùng, vui lòng thử lại!");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Box>
        {/* Button mở modal */}
        <Button
          sx={{ bgcolor: "#8DB883", color: "white" }}
          startIcon={<AddOutlinedIcon />}
          onClick={handleOpenAddUser}
        >
          Thêm người dùng
        </Button>

        <Modal open={openAddUser} onClose={handleCloseAddUser}>
          <Box
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 900,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
            }}
          >
            {/* Tiêu đề modal */}
            <Box
              sx={{
                backgroundColor: "#8DB883",
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
                px: 2,
                minHeight: "50px",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Thêm người dùng
              </Typography>

              <IconButton onClick={handleCloseAddUser}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>

            {/* Nội dung form */}
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="505px"
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                display="grid"
                gridTemplateColumns="1fr 1fr"
                gap={3}
                p={3}
              >
                {/* Username */}
                <Box display="flex" flexDirection="column">
                  <Typography>Tên đăng nhập</Typography>
                  <TextField
                    {...register("username", {
                      required: "Tên đăng nhập không được để trống",
                      minLength: {
                        value: 3,
                        message: "Tên đăng nhập phải có ít nhất 3 ký tự",
                      },
                      maxLength: {
                        value: 50,
                        message: "Tên đăng nhập không được vượt quá 50 ký tự",
                      },
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                </Box>

                {/* Fullname */}
                <Box display="flex" flexDirection="column">
                  <Typography>Họ và tên</Typography>
                  <TextField
                    {...register("fullname", {
                      required: "Họ và tên không được để trống",
                      minLength: {
                        value: 3,
                        message: "Họ tên phải có ít nhất 3 ký tự",
                      },
                      maxLength: {
                        value: 50,
                        message: "Họ tên không được vượt quá 50 ký tự",
                      },
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                    error={!!errors.fullname}
                    helperText={errors.fullname?.message}
                  />
                </Box>

                {/* Password */}
                <Box display="flex" flexDirection="column">
                  <Typography>Mật khẩu</Typography>
                  <TextField
                    type="password"
                    {...register("password", {
                      required: "Mật khẩu không được để trống",
                      minLength: {
                        value: 6,
                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                      },
                      maxLength: {
                        value: 50,
                        message: "Mật khẩu không được vượt quá 50 ký tự",
                      },
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </Box>

                {/* Re-password */}
                <Box display="flex" flexDirection="column">
                  <Typography>Nhập lại mật khẩu</Typography>
                  <TextField
                    type="password"
                    {...register("rePassword", {
                      required: "Vui lòng nhập lại mật khẩu",
                      validate: (value) =>
                        value === passwordValue || "Mật khẩu không khớp",
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                    error={!!errors.rePassword}
                    helperText={errors.rePassword?.message}
                  />
                </Box>

                {/* Phone */}
                <Box display="flex" flexDirection="column">
                  <Typography>Số điện thoại</Typography>
                  <TextField
                    {...register("phone", {
                      required: "Số điện thoại không được để trống",
                      pattern: {
                        value: /^[0-9+\-()\s]+$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                      minLength: {
                        value: 7,
                        message: "Số điện thoại quá ngắn",
                      },
                      maxLength: {
                        value: 15,
                        message: "Số điện thoại quá dài",
                      },
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                </Box>

                {/* Email */}
                <Box display="flex" flexDirection="column">
                  <Typography>Email</Typography>
                  <TextField
                    type="email"
                    {...register("email", {
                      required: "Email không được để trống",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email không hợp lệ",
                      },
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Box>

                {/* Vai trò (Role) */}
                <Box display="flex" flexDirection="column">
                  <Typography>Vai trò</Typography>
                  <Controller
                    name="role"
                    control={control}
                    rules={{ required: "Vai trò không được để trống" }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        options={roleData?.map((role) => role.name) || []}
                        value={field.value || ""}
                        onChange={(_, data) => field.onChange(data)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{
                              height: 40,
                              "& .MuiOutlinedInput-root": {
                                paddingRight: "12px !important",
                              },
                              "& .MuiInputBase-root": {
                                height: 40,
                                borderRadius: "8px !important",
                              },
                            }}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {params.InputProps?.endAdornment}
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={handleOpenAddRole}
                                      edge="end"
                                      size="small"
                                    >
                                      <AddIcon />
                                    </IconButton>
                                  </InputAdornment>
                                </>
                              ),
                            }}
                            error={!!errors.role}
                            helperText={errors.role?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Box>

                {/* Ngày sinh */}
                <Box display="flex" flexDirection="column">
                  <Typography>Ngày sinh</Typography>
                  <TextField
                    type="date"
                    {...register("birthday", {
                      required: "Ngày sinh không được để trống",
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                    error={!!errors.birthday}
                    helperText={errors.birthday?.message}
                  />
                </Box>

                {/* Nút Lưu */}
                <Box
                  sx={{
                    gridColumn: "1 / -1",
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 1,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#8DB883",
                      color: "white",
                      width: "100px",
                      "&:hover": {
                        bgcolor: "#77a56d",
                      },
                    }}
                  >
                    Lưu
                  </Button>
                </Box>

                {/* Hiển thị lỗi form */}
                {errorForm && (
                  <Box sx={{ gridColumn: "1 / -1", color: "red", mt: 1 }}>
                    {errorForm}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Modal>

        <AddRoleModal
          open={openAddRole}
          onClose={() => setOpenAddRole(false)}
        />
      </Box>
    </>
  );
};

export default AddUserModal;
