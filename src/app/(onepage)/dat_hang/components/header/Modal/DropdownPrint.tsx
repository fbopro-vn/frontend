"use client";
import * as React from "react";
import {
  Box,
  Menu,
  MenuItem,
  Typography,
  Button,
  Switch,
  TextField,
  IconButton
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

export default function PrintSettingsSelect() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [copies, setCopies] = React.useState(1);
  const [deliveryCopies, setDeliveryCopies] = React.useState(1);
  const [autoPrintInvoice, setAutoPrintInvoice] = React.useState(false);
  const [autoPrintDelivery, setAutoPrintDelivery] = React.useState(false);
  const [groupItems, setGroupItems] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton sx={{
                color: "#fff"}} onClick={handleClick}>
        <PrintIcon fontSize="large" sx={{ mx: "10px" }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box sx={{ p: 2, width: 300, }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography>Tự động in hóa đơn</Typography>
            <Switch checked={autoPrintInvoice} onChange={() => setAutoPrintInvoice(!autoPrintInvoice)} />
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography>Số bản in (Liên)</Typography>
            <TextField
              type="number"
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
              sx={{ width: 65 }}
            
            />
          </Box>
          <Box textAlign="center" mb={2}>
            <Button variant="contained" sx={{ bgcolor: "#d98236" }}>
              A. Mẫu in đặt hàng
            </Button>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center"  mb={2}>
            <Typography>Tự động in phiếu giao hàng</Typography>
            <Switch checked={autoPrintDelivery} onChange={() => setAutoPrintDelivery(!autoPrintDelivery)} />
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography>Số bản in (Liên)</Typography>
            <TextField
              type="number"
              value={deliveryCopies}
              onChange={(e) => setDeliveryCopies(Number(e.target.value))}
              sx={{ width: 65 }}
             
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3, paddingLeft: 4, paddingRight: 4 }}>
                        <Button variant="outlined" sx={{
                            color: "#8DB883", // Màu chữ giống border
                            border: "1px solid #8DB883",
                            width: "100px", // Đúng cú pháp
                            "&:hover": {
                                backgroundColor: "rgba(141, 184, 131, 0.1)", // Khi hover, nền nhạt
                                border: "1px solid #8DB883",
                                 // Giữ nguyên border
                            },

                        }} onClick={handleClose}>Bỏ qua</Button>
                        <Button variant="contained" sx={{
                            bgcolor: "#8DB883",
                            width: "100px"
                        }} onClick={handleClose}>Xong</Button>
                    </Box>
        </Box>
      </Menu>
    </>
  );
}
