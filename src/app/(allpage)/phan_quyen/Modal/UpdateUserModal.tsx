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
import useProductData from "@/app/hooks/useProductData";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import React, { useState, useEffect } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { parse, format } from "date-fns";
import useRoleData from "@/app/hooks/useRoleData";
import { toast } from "react-toastify";

const UpdateUserModal = ({
  checkedRows,
  data,
}: {
  checkedRows: Record<string, boolean>;
  data: User[];
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>(); // Xác định kiểu dữ liệu cho form

  const { roleData, isLoading } = useRoleData(
    "http://api.sdc.com:8000/v1/roles"
  );
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorForm, setErrorForm] = useState("");
  const handleOpenUpdateUser = () => {
    setOpenUpdateUser(true);
  };
  const handleCloseUpdateUser = () => {
    setOpenUpdateUser(false);
  };

  const [openAddRole, setOpenAddRole] = useState(false);

  const handleCloseAddRole = () => {
    setOpenAddRole(false);
  };

  const selectedCount = Object.values(checkedRows).filter(Boolean).length;
  const isDisabled = selectedCount !== 1;
  const selectedUsertId = Object.keys(checkedRows).find(
    (id) => checkedRows[id]
  );

  const isReadOnlyUser = selectedUsertId === "US1";

  const onSubmit = async (formData: User) => {
    if (!selectedUsertId) {
      setErrorForm("Không tìm thấy người dùng để cập nhật");
      return;
    }
    setLoading(true);
    setErrorForm("");
    try {
      const accessToken = localStorage.getItem("access_token"); // Lấy token từ localStorage

      // Chuẩn bị payload gửi lên server
      const payload: any = {
        username: formData.username,
        fullname: formData.fullname,
        phone: formData.phone,
        email: formData.email,
        role: formData.role,
        birthday: formData.birthday, // định dạng yyyy-MM-dd rồi, gửi thẳng
      };

      // Chỉ thêm password nếu có giá trị, tránh gửi password rỗng
      if (formData.password && formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      // Gửi PATCH request cập nhật user
      await axios.patch(
        `http://api.sdc.com:8000/v1/users/${selectedUsertId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Thêm header Authorization
          },
        }
      );

      // Đóng modal sau khi cập nhật thành công
      toast.success("Cập nhật người dùng thành công!");
      handleCloseUpdateUser();
    } catch (err) {
      console.error("Lỗi khi cập nhật người dùng", err);
      setErrorForm("Cập nhật người dùng thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (openUpdateUser && selectedUsertId) {
      const selectedData = data.find((item) => item.id === selectedUsertId);
      if (!selectedData) return;
      console.log("data dưc chọn", selectedData);
      // Parse từ chuỗi "dd/MM/yyyy" sang Date
      const parsedDate = parse(selectedData.birthday, "dd/MM/yyyy", new Date());

      // Format lại thành chuỗi "yyyy-MM-dd" để hiển thị lên input type="date"
      const formattedDate = format(parsedDate, "yyyy-MM-dd");
      reset({
        username: selectedData.username || "",
        fullname: selectedData.fullname || "",
        phone: selectedData.phone || "",
        email: selectedData.email || "",
        role: selectedData.role || "",
        birthday: formattedDate || "",
      });
    }
  }, [openUpdateUser]);

  return (
    <Box>
      {/* Button */}
      <Button
        sx={{
          bgcolor: "#8DB883",
          color: "white",
          width: "100px",
        }}
        startIcon={<SettingsOutlinedIcon />}
        onClick={handleOpenUpdateUser}
        disabled={isDisabled}
      >
        Sửa
      </Button>

      <Modal open={openUpdateUser} onClose={handleCloseUpdateUser}>
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Sửa người dùng
            </Typography>

            <IconButton onClick={handleCloseUpdateUser}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          {/* Nội dung */}
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
                      minLength: {
                        value: 3,
                        message: "Tên phải có ít nhất 3 ký tự",
                      },
                      maxLength: {
                        value: 50,
                        message: "Tên không được vượt quá 50 ký tự",
                      },
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                  />
                  <Typography
                    sx={{
                      minHeight: "20px",
                      fontSize: "15px",
                      color: "red",
                      mt: 0.5,
                    }}
                  >
                    {errors.username?.message}
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column">
                  <Typography>Họ và tên</Typography>
                  <TextField
                    {...register("fullname", {
                      required: "Tên khách hàng không được để trống",
                      minLength: {
                        value: 3,
                        message: "Tên phải có ít nhất 3 ký tự",
                      },
                      maxLength: {
                        value: 50,
                        message: "Tên không được vượt quá 50 ký tự",
                      },
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                  />
                  <Typography
                    sx={{
                      minHeight: "20px",
                      fontSize: "15px",
                      color: "red",
                      mt: 0.5,
                    }}
                  >
                    {errors.fullname?.message}
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column">
                  <Typography>Mật khẩu</Typography>
                  <TextField
                    type="password"
                    {...register("password", {
                      required: false, // Không bắt buộc nhập
                      minLength: {
                        value: 3,
                        message: "Mật khẩu phải có ít nhất 3 ký tự",
                      },
                      maxLength: {
                        value: 50,
                        message: "Mật khẩu không được vượt quá 50 ký tự",
                      },
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                  />

                  <Typography
                    sx={{
                      minHeight: "20px",
                      fontSize: "15px",
                      color: "red",
                      mt: 0.5,
                    }}
                  >
                    {errors.password?.message}
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column">
                  <Typography>Số điện thoại</Typography>
                  <TextField
                    {...register("phone", {
                      required: "Tên khách hàng không được để trống",
                      minLength: {
                        value: 3,
                        message: "Tên phải có ít nhất 3 ký tự",
                      },
                      maxLength: {
                        value: 50,
                        message: "Tên không được vượt quá 50 ký tự",
                      },
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                  />
                  <Typography
                    sx={{
                      minHeight: "20px",
                      fontSize: "15px",
                      color: "red",
                      mt: 0.5,
                    }}
                  >
                    {errors.phone?.message}
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column">
                  <Typography>Email</Typography>
                  <TextField
                    type="email"
                    {...register("email", {
                      required: "Tên khách hàng không được để trống",
                      minLength: {
                        value: 3,
                        message: "Tên phải có ít nhất 3 ký tự",
                      },
                      maxLength: {
                        value: 50,
                        message: "Tên không được vượt quá 50 ký tự",
                      },
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                  />
                  <Typography
                    sx={{
                      minHeight: "20px",
                      fontSize: "15px",
                      color: "red",
                      mt: 0.5,
                    }}
                  >
                    {errors.email?.message}
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column">
                  <Typography>Vai trò</Typography>
                  <Controller
                    name="role"
                    control={control}
                    rules={{
                      required: "Đơn vị tính không được để trống",
                    }}
                    render={({ field }) => (
                      <Autocomplete
                        disabled={isReadOnlyUser}
                        {...field}
                        disablePortal
                        freeSolo
                        defaultValue={""}
                        options={roleData?.map((role) => role.name) || []} // Đảm bảo không
                        value={field.value || ""} // 🔹 Luôn có giá trị mặc định
                        onChange={(_, data) => field.onChange(data)} // Cập nhật giá trị cho form
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{
                              height: 40,
                              "& .MuiOutlinedInput-root": {
                                paddingRight: "12px !important", // Chừa khoảng trống để không bị đè lên icon
                              },
                              "& .MuiInputBase-root": {
                                height: 40,
                                borderRadius: "8px !important",
                              },
                            }}
                          />
                        )}
                      />
                    )}
                  />
                  <Typography
                    sx={{
                      minHeight: "20px",
                      fontSize: "15px",
                      color: "red",
                      mt: 0.5,
                    }}
                  >
                    {errors.role?.message}
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column">
                  <Typography>Ngày sinh</Typography>
                  <TextField
                    type="date"
                    {...register("birthday", {
                      required: "Tên khách hàng không được để trống",
                      minLength: {
                        value: 3,
                        message: "Tên phải có ít nhất 3 ký tự",
                      },
                      maxLength: {
                        value: 50,
                        message: "Tên không được vượt quá 50 ký tự",
                      },
                    })}
                    sx={{
                      "& .MuiInputBase-root": { height: 40, borderRadius: 2 },
                    }}
                  />
                  <Typography
                    sx={{
                      minHeight: "20px",
                      fontSize: "15px",
                      color: "red",
                      mt: 0.5,
                    }}
                  >
                    {errors.birthday?.message}
                  </Typography>
                </Box>

                {/* ✅ Nút Lưu nằm cuối form, canh phải */}
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
              </Box>
            </>
          )}
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
        <Box>Hello</Box>
      </Modal>
    </Box>
  );
};

export default UpdateUserModal;
