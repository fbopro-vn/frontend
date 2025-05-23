import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import React from 'react'
import TextField from '@mui/material/TextField'


  const InfoCustomer = ({ id, data }: { id: string, data: any[] }) => {
   const filteredData = data.find(item => item.id === id);
  return (
    <Box mt='10px' bgcolor="#f9f9f9">
      <Box display="flex" gap={3}>
            <Box sx={{ width: "40%" }} p='10px'>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Mã khách hàng:</Typography>
                <Typography>{filteredData?.id}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Tên khách:</Typography>
                <Typography>{filteredData?.name}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Số điện thoại:</Typography>
                <Typography>{filteredData?.phone}</Typography>
              </Box>
            </Box>

  {/* Thêm cột dọc phân cách */}
  <Box sx={{ borderLeft: "1px solid #ccc", height: "auto", mx: 2 }} />  {/* Cột dọc */}
  
            <Box sx={{ width: "40%" }} p='10px'>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Địa chỉ:</Typography>
                <Typography sx={{ wordWrap: "break-word", maxWidth: "200px", textAlign: "right" }}>
                  {filteredData?.address}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Người tạo:</Typography>
                <Typography>{filteredData?.createdBy?.fullname}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Ngày tạo:</Typography>
                <Typography>{filteredData?.createdAt}</Typography>
              </Box>
            </Box>

            <Box sx={{ borderLeft: "1px solid #ccc", height: "auto", mx: 2 }} />  {/* Cột dọc */}

            <TextField 
              sx={{ width: '520px' }} 
              id="outlined-basic" 
              placeholder='Ghi chú'
              variant="outlined" 
              multiline
              minRows={9}
              maxRows={9}
    />
    
          </Box>
    </Box>
  )
}

export default InfoCustomer
