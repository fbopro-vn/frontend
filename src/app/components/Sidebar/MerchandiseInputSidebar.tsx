'use client'
import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LogoC from '../../../../public/assets/logo_sdc.png'
import Image from "next/image";
import BodyMerchandiseInput from '@/app/api/Merchandise/BodyMerchandiseInput.json'
import removeVietnameseTones from "@/app/utils/removeVietnameseTones";
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

const MerchandiseInputSidebar = ({ onFilter }: { onFilter: (data: typeof BodyMerchandiseInput) => void }) => {
  const [searchProductId, setSearchProductId] = useState("");  // Nhập mã đặt hàng
  const [searchProduct, setSearchProduct] = useState(""); // Nhập tên khách hàng
  const [searchProductGroup, setSearchProductGroup] = useState(""); // Nhập tên khách hàng

  const [inputValueProduct, setInputValueProduct] = useState(""); // Quản lý nội dung ô nhập
  const [openAutoCompleteProduct, setOpenAutoCompleteProduct] = useState(false);
  const [inputValueProductGroup, setInputValueProductGroup] = useState(""); // Quản lý nội dung ô nhập
  const [openAutoCompleteProductGroup, setOpenAutoCompleteProductGroup] = useState(false);
  // Định nghĩa bộ lọc
  const applyFilters = () => {
    if (!BodyMerchandiseInput || BodyMerchandiseInput.length === 0) return;

    const lowerCaseProductId = removeVietnameseTones(searchProductId.trim().toLowerCase());
    const lowerCaseProduct = removeVietnameseTones(searchProduct.trim().toLowerCase());
    const lowerCaseProductGroup = removeVietnameseTones(searchProductGroup.trim().toLowerCase());

    const filteredProducts = BodyMerchandiseInput.filter(material => {

      // ✅ Lọc theo mã sản phẩm
      const matchesProductId = lowerCaseProductId ? removeVietnameseTones(material.material_id.toLowerCase()).includes(lowerCaseProductId) : true;

      // ✅ Lọc theo tên sản phẩm (fulltext-search)
      const matchesProduct = lowerCaseProduct
        ? lowerCaseProduct.split(" ").every(term => removeVietnameseTones(material.material_name.toLowerCase()).includes(term))
        : true;

      // ✅ Lọc theo tên sản phẩm (fulltext-search)
      const matchesProductGroup = lowerCaseProductGroup
        ? lowerCaseProductGroup.split(" ").every(term => removeVietnameseTones(material.material_group.toLowerCase()).includes(term))
        : true;

      return matchesProductId && matchesProduct && matchesProductGroup;
    });

    onFilter(filteredProducts);
  };

  // Reset Form
  const restForm = () => {
    setSearchProductId("")
    setSearchProduct("")
    setSearchProductGroup("")
  }
  useEffect(() => {
    applyFilters();
  }, [searchProductId, searchProduct, searchProductGroup]);

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
          placeholder="Nhập mã vật tư"
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
          value={searchProductId}
          onChange={(e) => setSearchProductId(e.target.value)}
        />
        {/* Có gợi ý */}
        <Autocomplete
          open={openAutoCompleteProduct}
          onOpen={() => {
            if (inputValueProduct) setOpenAutoCompleteProduct(true);
          }}

          options={BodyMerchandiseInput.map((item) => item.material_name)} // 🔹 options là mảng string
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
            <TextField {...params} placeholder='Nhập tên vật tư'
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
            new Set(BodyMerchandiseInput.map(item => item.material_group))
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
            <TextField {...params} placeholder='Nhập nhóm vật tư'
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

export default MerchandiseInputSidebar
