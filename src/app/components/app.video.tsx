'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export default function AppIntro() {
    return (
      <Box sx={{ position: 'relative', width: '100%' }}> 
        <video 
          autoPlay 
          muted 
          playsInline 
          loop 
          style={{ display: 'block', width: '100%', paddingTop: '90px' }}>
          <source src="/assets/intro.mp4" type="video/mp4" />
        </video>

        <Box sx={{ 
          position: 'absolute',
          top: '45%', // Căn giữa theo chiều dọc
          left: '40%', // Căn giữa theo chiều ngang
          transform: 'translate(-70%, -70%)', // Dịch ngược lại 50% kích thước
          color: 'white', 
          fontSize: '24px',
          fontWeight: 'bold',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Làm mờ nền để chữ dễ đọc
          padding: '10px',
          borderRadius: '8px'
        }}>
          <h4>CTCP TMDV quảng cáo SDC</h4>
          <h5>SDC SmartData giải pháp thông minh cho người tiêu dùng</h5>
          <p>Đáp ứng cho các doanh nghiệp trong thời kỳ chuyển đổi số...</p>
          <Button sx={{ 
        
           }} variant="contained">Giới thiệu</Button>
        </Box>

      </Box>
    );
}
