'use client'
import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LogoC from '../../../../public/assets/logo_sdc.png'
import Image from "next/image";
import BodyMerchandiseOutput from '@/app/api/Merchandise/BodyMerchandiseOutput.json'
import removeVietnameseTones from "@/app/utils/removeVietnameseTones";
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

const MerchandiseOutputSidebar = ({ onFilter }: { onFilter: (data: typeof BodyMerchandiseOutput) => void }) => {
  const [searchid, setSearchid] = useState("");  // Nhập mã đặt hàng
  const [searchProduct, setSearchProduct] = useState(""); // Nhập tên khách hàng
  const [searchProductGroup, setSearchProductGroup] = useState(""); // Nhập tên khách hàng

  const [inputValueProduct, setInputValueProduct] = useState(""); // Quản lý nội dung ô nhập
  const [openAutoCompleteProduct, setOpenAutoCompleteProduct] = useState(false);
  const [inputValueProductGroup, setInputValueProductGroup] = useState(""); // Quản lý nội dung ô nhập
  const [openAutoCompleteProductGroup, setOpenAutoCompleteProductGroup] = useState(false);
  // Định nghĩa bộ lọc
  const applyFilters = () => {
    if (!BodyMerchandiseOutput || BodyMerchandiseOutput.length === 0) return;

    const lowerCaseid = removeVietnameseTones(searchid.trim().toLowerCase());
    const lowerCaseProduct = removeVietnameseTones(searchProduct.trim().toLowerCase());
    const lowerCaseProductGroup = removeVietnameseTones(searchProductGroup.trim().toLowerCase());

    const filteredProducts = BodyMerchandiseOutput.filter(product => {

      // ✅ Lọc theo mã sản phẩm
      const matchesid = lowerCaseid ? removeVietnameseTones(product.id.toLowerCase()).includes(lowerCaseid) : true;

      // ✅ Lọc theo tên sản phẩm (fulltext-search)
      const matchesProduct = lowerCaseProduct
        ? lowerCaseProduct.split(" ").every(term => removeVietnameseTones(product.product.toLowerCase()).includes(term))
        : true;

      // ✅ Lọc theo tên sản phẩm (fulltext-search)
      const matchesProductGroup = lowerCaseProductGroup
        ? lowerCaseProductGroup.split(" ").every(term => removeVietnameseTones(product.product_group.toLowerCase()).includes(term))
        : true;

      return matchesid && matchesProduct && matchesProductGroup;
    });

    onFilter(filteredProducts);
  };

  // Reset Form
  const restForm = () => {
    setSearchid("")
    setSearchProduct("")
    setSearchProductGroup("")
  }
  useEffect(() => {
    applyFilters();
  }, [searchid, searchProduct, searchProductGroup]);

  return (
    <Box
      sx={{
        width: "100%",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          src={LogoC}
          height={100}
          width={100}
          alt="LogoC" />
      </Box>

      <Box sx={{
        mx: '20px',
        flexDirection: 'column',
      }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography sx={{ fontWeight: 'bold' }}>Tìm kiếm</Typography>
          <IconButton onClick={restForm}>
            <ViewDayOutlinedIcon/>
          </IconButton>
        </Box>
        <TextField 
          fullWidth
          placeholder="Nhập mã sản phẩm"
          sx={{
            mb: 2.5,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              height: "40px",
            },
            "& input::placeholder": {
              fontSize: 14,
            },
          }}
          value={searchid}
          onChange={(e) => setSearchid(e.target.value)}
        />
        {/* Có gợi ý */}
        <Autocomplete
          open={openAutoCompleteProduct}
          onOpen={() => {
            if (inputValueProduct) setOpenAutoCompleteProduct(true);
          }}

          options={BodyMerchandiseOutput.map((item) => item.product)} // 🔹 options là mảng string
          filterOptions={(options, { inputValue }) => {
            const query = removeVietnameseTones(inputValue.toLowerCase());
            return options.filter((option) =>
              removeVietnameseTones(option.toLowerCase()).includes(query)
            );
          }}
          onClose={() => setOpenAutoCompleteProduct(false)}
          inputValue={inputValueProduct}
          onInputChange={(_, newInputValue) => {
            setInputValueProduct(newInputValue);
            setOpenAutoCompleteProduct(!!newInputValue); // ✅ mở popup khi có ký tự
          }}
          value={searchProduct}
          onChange={(_, newValue) => {
            if (typeof newValue === "string") {
              setSearchProduct(newValue);
              setInputValueProduct(newValue);
              setOpenAutoCompleteProduct(false); // ✅ đóng popup sau khi chọn
            }
          }}

          // ✅ Chỉ hiển thị popup khi có ký tự nhập vào

          renderInput={(params) =>
            <TextField {...params} placeholder='Nhập tên sản phẩm'
              sx={{
                mb: 2.5,
                '& .MuiInputBase-root': {
                  borderRadius: "10px",
                  height: 40,

                  "& .MuiAutocomplete-endAdornment": { display: "none" } // Chiều cao của input
                },
                "& input::placeholder": {
                  fontSize: 14,
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'default', // Màu mặc định của border
                  },
                  '&:hover fieldset': {
                    borderColor: '#8DB883', // Khi hover, border sẽ đổi màu đỏ
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8DB883', // Khi active (focused), border sẽ đổi màu vàng
                  }
                }
              }}
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />

          }
          noOptionsText={"Không tìm thấy kết quả!"}
        />

        {/* Có gợi ý */}
        <Autocomplete
          open={openAutoCompleteProductGroup}
          onOpen={() => {
            if (inputValueProductGroup) setOpenAutoCompleteProductGroup(true);
          }}

          options={Array.from(
            new Set(BodyMerchandiseOutput.map(item => item.product_group))
          )} // 🔹 options là mảng string
          filterOptions={(options, { inputValue }) => {
            const query = removeVietnameseTones(inputValue.toLowerCase());
            return options.filter((option) =>
              removeVietnameseTones(option.toLowerCase()).includes(query)
            );
          }}
          onClose={() => setOpenAutoCompleteProductGroup(false)}
          inputValue={inputValueProductGroup}
          onInputChange={(_, newInputValue) => {
            setInputValueProductGroup(newInputValue);
            setOpenAutoCompleteProductGroup(!!newInputValue); // ✅ mở popup khi có ký tự
          }}
          value={searchProductGroup}
          onChange={(_, newValue) => {
            if (typeof newValue === "string") {
              setSearchProductGroup(newValue);
              setInputValueProductGroup(newValue);
              setOpenAutoCompleteProductGroup(false); // ✅ đóng popup sau khi chọn
            }
          }}

          // ✅ Chỉ hiển thị popup khi có ký tự nhập vào

          renderInput={(params) =>
            <TextField {...params} placeholder='Nhập nhóm sản phẩm'
              sx={{
                mb: 2.5,
                '& .MuiInputBase-root': {
                  borderRadius: "10px",
                  height: 40,

                  "& .MuiAutocomplete-endAdornment": { display: "none" } // Chiều cao của input
                },
                "& input::placeholder": {
                  fontSize: 14,
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'default', // Màu mặc định của border
                  },
                  '&:hover fieldset': {
                    borderColor: '#8DB883', // Khi hover, border sẽ đổi màu đỏ
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8DB883', // Khi active (focused), border sẽ đổi màu vàng
                  }
                }
              }}
              value={searchProductGroup}
              onChange={(e) => setSearchProductGroup(e.target.value)}
            />

          }
          noOptionsText={"Không tìm thấy kết quả!"}
        />

      </Box>
    </Box>
  )
}

export default MerchandiseOutputSidebar
