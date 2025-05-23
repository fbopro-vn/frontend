'use client'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import User from '@/app/api/User/User.json'

const InfoUser = ({ _id }: { _id: string }) => {
    const filteredData = User.find(item => item._id === _id)
    return (
      <Box mt='10px' bgcolor="#f9f9f9" p={2}>
        <Box display="flex" gap={3}>
              <Box sx={{ width: "40%" }} p='10px'>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Mã nhân viên:</Typography>
                  <Typography>{filteredData?._id}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Họ và tên:</Typography>
                  <Typography>{filteredData?.fullname}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Tên đăng nhập:</Typography>
                  <Typography>{filteredData?.username}</Typography>
                </Box>
              </Box>
  
    {/* Thêm cột dọc phân cách */}
    <Box sx={{ borderLeft: "1px solid #ccc", height: "auto", mx: 2 }} />  {/* Cột dọc */}
    
              <Box sx={{ width: "40%" }} p='10px'>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography>Số điện thoại:</Typography>
                    <Typography>{filteredData?.phone}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Địa chỉ:</Typography>
                  <Typography sx={{ wordWrap: "break-word", maxWidth: "200px", textAlign: "right" }}>
                    {filteredData?.address}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Ngày tạo:</Typography>
                  <Typography>{filteredData?.created_at}</Typography>
                </Box>
              </Box>
      
            </Box>
      </Box>
    )
}
export default InfoUser