'use client';

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { setMonth } from '@/app/redux/features/monthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';

const SelectMonth: React.FC = () => {
  const dispatch = useDispatch();
  
  // Lấy tháng hiện tại từ Redux (đảm bảo tháng có định dạng 2 chữ số)
  const month = useSelector((state: RootState) => state.month.selectedMonth);

  const handleChange = (e: any) => {
    dispatch(setMonth(e.target.value)); // Cập nhật lại giá trị tháng trong Redux
  };

  return (
    <FormControl sx={{ minWidth: "130px" }}>
      <Select
        labelId="select-month-label"
        id="select-month"
        value={month}
        onChange={handleChange}
        displayEmpty
        sx={{
          height: "32px",  
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            height: "32px",
            fontSize: "14px",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          "& .MuiSelect-select": {
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        {/* Cung cấp các tháng với giá trị luôn là chuỗi 2 chữ số */}
        {Array.from({ length: 12 }, (_, i) => (
          <MenuItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
            Tháng {i + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl> 
  );
};

export default SelectMonth;
