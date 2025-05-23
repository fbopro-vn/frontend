import { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import LogoC from '../../../../public/assets/logo_sdc.png'
import Image from "next/image";
import BodyProvider from '@/app/api/BodyProvider.json'
import removeVietnameseTones from "@/app/utils/removeVietnameseTones";
import IconButton from "@mui/material/IconButton";
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

const ProviderSidebar = ({ onFilter }: { onFilter: (data: typeof BodyProvider) => void }) => {
  const [searchProviderId, setSearchProviderId] = useState("");  // Nhập mã đặt hàng
  const [searchProvider, setSearchProvider] = useState(""); // Nhập tên khách hàng

  const [inputValueProvider, setInputValueProvider] = useState(""); // Quản lý nội dung ô nhập
  const [openAutoCompleteProvider, setOpenAutoCompleteProvider] = useState(false);

    // Định nghĩa bộ lọc
    const applyFilters = () => {
      if (!BodyProvider || BodyProvider.length === 0) return;
  
      const lowerCaseProviderId = removeVietnameseTones(searchProviderId.trim().toLowerCase());
      const lowerCaseProvider = removeVietnameseTones(searchProvider.trim().toLowerCase());
  
      const filteredProviders = BodyProvider.filter(provider => {
  
        // ✅ Lọc theo mã sản phẩm
        const matchesProviderId = lowerCaseProviderId ? removeVietnameseTones(provider.provider_id.toLowerCase()).includes(lowerCaseProviderId) : true;
  
        // ✅ Lọc theo tên sản phẩm (fulltext-search)
        const matchesProvider = lowerCaseProvider
          ? lowerCaseProvider.split(" ").every(term => removeVietnameseTones(provider.provider.toLowerCase()).includes(term))
          : true;
  
  
        return matchesProviderId && matchesProvider;
      });
  
      onFilter(filteredProviders);
    };
    
    // Reset Form
  const restForm = () => {
    setSearchProviderId("")
    setSearchProvider("")
  }
  
    useEffect(() => {
      applyFilters();
    }, [searchProviderId, searchProvider]);
  
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
          alt="LogoC"/>
      </Box>
      
        <Box sx={{
          mx: '20px',
          flexDirection: 'column',
        }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography sx={{ fontWeight: 'bold' }}>Tìm kiếm</Typography>
          <IconButton onClick={restForm}>
            <ViewDayOutlinedIcon />
          </IconButton>
        </Box>
      <TextField
        fullWidth
        placeholder="Nhập mã nhà cung cấp"
        value={searchProviderId}
        onChange={(e) => setSearchProviderId(e.target.value)}
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
      />
      
        {/* Có gợi ý */}
      <Autocomplete
          open={openAutoCompleteProvider}
          onOpen={() => {
            if (inputValueProvider) setOpenAutoCompleteProvider(true);
          }}

          options={BodyProvider.map((item) => item.provider)} // 🔹 options là mảng string
          filterOptions={(options, { inputValue }) => {
            const query = removeVietnameseTones(inputValue.toLowerCase());
            return options.filter((option) =>
              removeVietnameseTones(option.toLowerCase()).includes(query)
            );
          }}
          onClose={() => setOpenAutoCompleteProvider(false)}
          inputValue={inputValueProvider}
          onInputChange={(_, newInputValue) => {
            setInputValueProvider(newInputValue);
            setOpenAutoCompleteProvider(!!newInputValue); // ✅ mở popup khi có ký tự
          }}
          value={searchProvider}
          onChange={(_, newValue) => {
            if (typeof newValue === "string") {
              setSearchProvider(newValue);
              setInputValueProvider(newValue);
              setOpenAutoCompleteProvider(false); // ✅ đóng popup sau khi chọn
            }
          }}

          // ✅ Chỉ hiển thị popup khi có ký tự nhập vào

          renderInput={(params) =>
            <TextField {...params} placeholder='Nhập tên nhà cung cấp'
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
              value={searchProvider}
              onChange={(e) => setSearchProvider(e.target.value)}
            />
          }
          noOptionsText={"Không tìm thấy kết quả!"}
        />
      </Box>
    </Box>
  )
}

export default ProviderSidebar
