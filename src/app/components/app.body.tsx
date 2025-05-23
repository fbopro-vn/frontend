'use client'

import { Box, Typography } from "@mui/material";
import Image from "next/image";


const AppBody = () => {
    return (     
        <Box sx={{ 
            display: "flex",
            justifyContent: "space-between",
            mt: '220px',
         }}>
            <Box sx={{ 
        maxWidth: "50%", // Giới hạn chiều rộng văn bản
        textAlign: "justify", // Căn đều hai bên
        // lineHeight: "1.6", // Tăng khoảng cách dòng giúp dễ đọc
        padding: "20px", // Thêm khoảng cách với viền

    }}>          
                <Typography sx={{ color: '#f5605b',fontSize: '26px', fontWeight: 'bold', textAlign: "left" }}>
                    Giới Thiệu
                </Typography>
                <Typography>
                    <b>Data Automate</b> là một ứng dụng web mạnh mẽ giúp tự động hóa quá trình ghi và đồng bộ dữ liệu trực tiếp từ các nguồn khác nhau lên Google Sheets. Với sự hỗ trợ của API Google, ứng dụng này mang đến giải pháp đơn giản và hiệu quả để tiết kiệm thời gian và giảm thiểu sai sót trong quá trình nhập liệu thủ công.
                </Typography>
            </Box>
            <Image src={'/assets/bodyC.jpg'} width={608} height={332} quality={100} alt="bodyC" />
        </Box>

        
    )
}

export default AppBody;
