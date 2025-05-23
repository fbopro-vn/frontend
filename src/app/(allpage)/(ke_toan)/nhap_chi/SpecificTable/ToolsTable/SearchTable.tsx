'use client'

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "theme.palette.primary.main", // Nền sáng cho trường tìm kiếm
  "&:hover": {
    backgroundColor: "theme.palette.primary.main",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%", // Làm cho nút tìm kiếm có viền bo tròn
  border: "none", // Loại bỏ viền cho biểu tượng kính lúp
  transition: "border 0.3s", // Thêm hiệu ứng khi thay đổi viền
  backgroundColor: "theme.palette.primary.main", // Nền nhẹ cho nút
  "&:hover": {
    backgroundColor: "theme.palette.primary.main", // Thêm hiệu ứng hover
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    borderRadius: theme.shape.borderRadius,
    border: `2px solid #8DB883`, // Viền cho input
    outline: "none", // Bỏ viền outline mặc định của trình duyệt
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
        borderColor: theme.palette.primary.main, // Viền đổi màu khi focus
      },
    },
  },
}));

export default function SearchTable({ onSearchChange }: { onSearchChange: (text: string) => void }) {
  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Search>
    </Box>
  );
}
