"use client";

import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { usePathname } from "next/navigation";
import { getActiveMenuKey } from "@/app/utils/menuHighlights";

const Report = () => {
  const pathname = usePathname();
  const isActive = getActiveMenuKey(pathname);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        sx={{
          color: "white",
          minWidth: '135px',
          backgroundColor:
            isActive === "report" ? "#4CAF50" : "transparent",
        }}
        id="basic-button-report"
        aria-controls={open ? "basic-menu-report" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<AssessmentOutlinedIcon />}
        endIcon={<ExpandMoreIcon />}
      >
        Báo cáo
      </Button>
      <Menu
        id="basic-menu-report "
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 3, // Điều chỉnh độ bóng
          },
        }}
      >
        <MenuItem
          component={Link}
          href="/bao_cao/ban_hang"
         
        >
          <ListItemIcon>
            <StorefrontOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Bán hàng</ListItemText>
        </MenuItem>

        <MenuItem
          component={Link}
          href="/bao_cao/khach_hang"
         
        >
          <ListItemIcon>
            <GroupsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Khách hàng</ListItemText>
        </MenuItem>
        <MenuItem
          component={Link}
          href="/bao_cao/nha_cung_cap"
         
        >
          <ListItemIcon>
            <PrecisionManufacturingOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Nhà cung cấp</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Report;
