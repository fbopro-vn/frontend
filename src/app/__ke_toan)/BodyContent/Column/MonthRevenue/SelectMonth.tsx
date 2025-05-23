import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box'

interface Month {
  onValueChange: (value: string) => void;

}
const SelectMonth: React.FC = () => {
  const [month, setMonth] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  return (
      <FormControl sx={{ minWidth: "130px"  }}>
        <Select
          labelId="select-month-label"
          id="select-month"
          value={month}
          onChange={handleChange}
          displayEmpty
          sx={{
            height: "32px",  borderRadius: "8px",
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
          <MenuItem value="">
            <em>Chọn tháng</em>
          </MenuItem>
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i + 1} value={String(i + 1)}>
              Tháng {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl> 
  );
};

export default SelectMonth;