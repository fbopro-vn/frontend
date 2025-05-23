"use client"

import React, { useState } from "react"
import {
  Checkbox,
  IconButton,
  Popover,
  FormGroup,
  FormControlLabel,
  Typography,
  Box
} from "@mui/material"
import ViewListIcon from "@mui/icons-material/ViewList"

const columns = [
  "Mã vận đơn",
  "Mã đặt hàng",
  "Mã hóa đơn",
  "Thời gian",
  "Thời gian tạo",
  "Ngày cập nhật",
  "Thời gian giao hàng",
  "Số ngày chờ",
  "Khách hàng",
  "Điện thoại",
  "Địa chỉ",
  "Khu vực",
  "Phường/Xã",
  "Ngày sinh",
  "Đối tác giao hàng",
  "Người nhận đặt",
  "Người tạo",
  "Kênh bán",
  "Ghi chú",
  "Tổng tiền hàng",
  "Giảm giá",
  "Tổng sau giảm giá",
  "Thu khác",
  "Khách cần trả",
  "Khách đã trả",
  "Trạng thái"
]

const ColumnFilterPopover: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [checkedColumns, setCheckedColumns] = useState<string[]>([
    "Mã đặt hàng",
    "Thời gian",
    "Khách hàng",
    "Khách cần trả"
  ])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleToggle = (column: string) => {
    setCheckedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    )
  }

  const open = Boolean(anchorEl)
  const id = open ? "column-filter-popover" : undefined

  return (
    <Box>
      <IconButton aria-describedby={id} onClick={handleClick} color="primary">
        <ViewListIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Box sx={{ p: 2, maxHeight: 400, overflowY: "auto", width: 250 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Chọn cột hiển thị
          </Typography>
          <FormGroup>
            {columns.map((column) => (
              <FormControlLabel
                key={column}
                control={
                  <Checkbox
                    checked={checkedColumns.includes(column)}
                    onChange={() => handleToggle(column)}
                  />
                }
                label={column}
              />
            ))}
          </FormGroup>
        </Box>
      </Popover>
    </Box>
  )
}

export default ColumnFilterPopover
