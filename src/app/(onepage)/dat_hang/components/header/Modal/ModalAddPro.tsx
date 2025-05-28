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
  InputAdornment,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import AddIcon from "@mui/icons-material/Add";
import useProductData from "@/app/hooks/useProductData";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

interface ProductForm {
  name: string;
  fullname: string;
  password: string;
  rePassword: string;
  phone: string;
  email: string;
  unit: string;
  birthday: string;
}

interface AddProductModalProps {
  open: boolean;
  handleClose: () => void;
  onAddProduct: (product: Product) => void; // Nhận response từ API
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  handleClose,
  onAddProduct,
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      name: "",
      group: "",
      unit: "",
      costPrice: 0,
      salePrice: 0,
      stockQuantity: 0,
    },
  });

  const { mutate } = useProductData("http://api.fbopro.vn/v1/products");
  const [dialogType, setDialogType] = useState<"" | "group" | "unit">("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorForm, setErrorForm] = React.useState("");
  const [values, setValues] = React.useState({
    textmask: "(100) 000-0000",
    numberformat: "0",
  });

  const [valueSale, setValueSale] = React.useState({
    textmask: "(100) 000-0000",
    numberformat: "0",
  });

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
    handleCloseDialog();
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
      });
      const accessToken = localStorage.getItem("access_token"); // hoặc getFromLocalStorage("access_token")

      const response = await axios.post(
        "http://api.fbopro.vn/v1/products",
        {
          name: data.name,
          group: data.group,
          unit: data.unit,
          costPrice: Number(String(data.costPrice).replace(/\D/g, "")),
          salePrice: Number(String(data.salePrice).replace(/\D/g, "")) ?? 0,
          stockQuantity: data.stockQuantity ?? 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success('Thêm sản phẩm thành công!', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
      onAddProduct(response.data);
      mutate();
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
      <Modal open={open} onClose={handleClose}>
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
              Thêm mới hàng hóa
            </Typography>

            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          {/* Nội dung */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap={3}
            p={3}
            height={380}
          >
            {/* name */}
            <Box display="flex" flexDirection="column">
              <Typography>Tên sản phẩm</Typography>
              <TextField
                {...register("name", {
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
                sx={{ "& .MuiInputBase-root": { height: 40, borderRadius: 2 } }}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Box>

            {/* Group */}
            <Box display="flex" flexDirection="column">
              <Typography>Nhóm sản phẩm</Typography>

              <Controller
                name="group"
                control={control}
                rules={{
                  required: "Nhóm sản phẩm không được để trống",
                  minLength: {
                    value: 2,
                    message: "Nhóm sản phẩm phải có ít nhất 2 ký tự",
                  },
                  maxLength: {
                    value: 30,
                    message: "Nhóm sản phẩm không được vượt quá 30 ký tự",
                  },
                }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    disablePortal
                    defaultValue={""}
                    options={
                      getFromLocalStorage("productGroups") || [
                        "Không có kết quả!",
                      ]
                    } // Đảm bảo không
                    value={field.value || ""} // 🔹 Luôn có giá trị mặc định
                    onChange={(_, data) => field.onChange(data)} // Cập nhật giá trị cho form
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
                          ...params.InputProps, // ⚠️ Giữ lại `InputProps` gốc của Autocomplete
                          endAdornment: (
                            <>
                              {params.InputProps?.endAdornment}
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => handleOpenDialog("group")}
                                  edge="end"
                                  size="small"
                                >
                                  <AddIcon />
                                </IconButton>
                              </InputAdornment>
                            </>
                          ),
                        }}
                        error={!!errors.group}
                        helperText={errors.group?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>

            {/*  Unit */}
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
                    defaultValue={""}
                    options={
                      getFromLocalStorage("unitTypes") || ["Không có kết quả!"]
                    } // Đảm bảo không
                    value={field.value || ""} // 🔹 Luôn có giá trị mặc định
                    onChange={(_, data) => field.onChange(data)} // Cập nhật giá trị cho form
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
                                  onClick={() => handleOpenDialog("unit")}
                                  edge="end"
                                  size="small"
                                >
                                  <AddIcon />
                                </IconButton>
                              </InputAdornment>
                            </>
                          ),
                        }}
                        error={!!errors.unit}
                        helperText={errors.unit?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>

            {/* Giá vốn */}
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
                      if (values.numberformat === "0") {
                        setValues((prev) => ({
                          ...prev,
                          numberformat: "",
                        }));
                      }
                    }}
                    onBlur={() => {
                      if (values.numberformat === "") {
                        setValues((prev) => ({
                          ...prev,
                          numberformat: "0",
                        }));
                      }
                    }}
                    customInput={TextField}
                    thousandSeparator="."
                    decimalSeparator=","
                    valueIsNumericString
                    suffix=" VND"
                    variant="outlined"
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
                  />
                )}
              />
            </Box>

            {/* SalePrice */}
            <Box display="flex" flexDirection="column">
              <Typography fontWeight="bold">Giá Bán</Typography>
              <Controller
                name="salePrice"
                control={control}
                rules={
                  {
                    // required: "Giá bán không được bé hơn giá vốn",
                  }
                }
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
                      if (valueSale.numberformat === "0") {
                        setValueSale((prev) => ({
                          ...prev,
                          numberformat: "",
                        }));
                      }
                    }}
                    onBlur={() => {
                      if (valueSale.numberformat === "") {
                        setValueSale((prev) => ({
                          ...prev,
                          numberformat: "0",
                        }));
                      }
                    }}
                    customInput={TextField}
                    thousandSeparator="."
                    decimalSeparator=","
                    valueIsNumericString
                    suffix=" VND"
                    variant="outlined"
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
                  />
                )}
              />
            </Box>

            <Box display="flex" flexDirection="column">
              <Typography>Tồn Kho</Typography>
              <TextField
                type="number"
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
          <Button onClick={handleCloseDialog} sx={{ color: "red" }}>
            Hủy
          </Button>
          <Button
            onClick={() => addProductGroup(inputValue)}
            sx={{ bgcolor: "#8DB883", color: "#fff" }}
          >
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
          <Button onClick={handleCloseDialog} sx={{ color: "red" }}>
            Hủy
          </Button>
          <Button
            onClick={() => addUnitType(inputValue)}
            sx={{ bgcolor: "#8DB883", color: "#fff" }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProductModal;

// {
//     "ten_san_pham": "Thùng Phiếu Vuông 15cm",
//     "nhom_san_pham": "Thùng Phiếu",
//     "don_vi_tinh": "Cái",
//     "gia_von": 165000,
//     "gia_ban": 200000,
//     "ton_kho": 0,
//     "stock_in": 0,
//     "stock_out": 0
//   }
