import React, { useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import { usePathname } from 'next/navigation';


export default function DateFilter({
  onDateChange,
  dateRange
}: DateFilterProps) {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  const pathname = usePathname();
  const isTransictionRoute = pathname === "/giao_dich/dat_hang" || pathname === "/giao_dich/hoa_don";
  const isAccountantRoute = pathname === "/nhap_chi" || pathname === "/nhap_thu";
  const inputHeight = isTransictionRoute || isAccountantRoute ? '40px' : '56px';

  const handleStartDateChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      setStartDate(null);
      setEndDate(null);
      onDateChange("", "");
    } else {
      setStartDate(newValue);
      if (endDate && endDate.isBefore(newValue, "day")) {
        setEndDate(null);
      }
      onDateChange(newValue.format("DD/MM/YYYY"), endDate ? endDate.format("DD/MM/YYYY") : "");
    }
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      if (!startDate) {
        setEndDate(null);
        onDateChange("", "");
      } else {
        setEndDate(null);
        onDateChange(startDate.format("DD/MM/YYYY"), "");
      }
    } else {
      if (!startDate) {
        const today = dayjs();
        setStartDate(today);
        setEndDate(newValue);
        onDateChange(today.format("DD/MM/YYYY"), newValue.format("DD/MM/YYYY"));
      } else {
        setEndDate(newValue);
        onDateChange(startDate.format("DD/MM/YYYY"), newValue.format("DD/MM/YYYY"));
      }
    }
  };

  useEffect(() => {
    if (!dateRange.startDate && !dateRange.endDate) {
      setStartDate(null);
      setEndDate(null);
    }
  }, [dateRange.startDate, dateRange.endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isAccountantRoute ? (
        <Box sx={{
          display: 'flex',
          gap: 10
        }}>
          <Box>
            <Typography fontWeight='bold'>Từ ngày</Typography>
            <DatePicker
              format="DD/MM/YYYY"
              value={dateRange.startDate ? dayjs(dateRange.startDate, 'DD/MM/YYYY') : null}
              onChange={handleStartDateChange}
              slotProps={{
                textField: {
                  size: 'medium',
                  sx: {
                    width: "100%",
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: "10px",
                      height: inputHeight,
                    },
                    '& label': { display: 'none' }, // ✅ Ẩn label
                  },
                }
              }}
            />
          </Box>

          <Box>
            <Typography fontWeight='bold'>Đến ngày</Typography>
            <DatePicker
              format="DD/MM/YYYY"
              value={dateRange.endDate ? dayjs(dateRange.endDate, 'DD/MM/YYYY') : null}
              onChange={handleEndDateChange}
              minDate={startDate || dayjs()}
              shouldDisableDate={(date) => !!startDate && date.isBefore(startDate, "day")}
              slotProps={{
                textField: {
                  size: 'medium',
                  sx: {
                    width: "100%",
                    '& .MuiOutlinedInput-root': {
                      borderRadius: "10px",
                      height: inputHeight,
                    },
                    '& label': { display: 'none' }, // ✅ Ẩn label
                  },
                }
              }}
            />
          </Box>

        </Box>
        // 
      ) : (
        <>
          <Box sx={{ mt: 1 }}>
            <Typography sx={{ fontSize: 13, mb: 0.5 }}>Từ ngày</Typography>
            <DatePicker
              format="DD/MM/YYYY"
              value={dateRange.startDate ? dayjs(dateRange.startDate, 'DD/MM/YYYY') : null}
              onChange={handleStartDateChange}
              slotProps={{
                textField: {
                  size: 'medium',
                  sx: {
                    width: "100%",
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: "10px",
                      height: inputHeight,
                    },
                    '& label': { display: 'none' }, // ✅ Ẩn label
                  },
                }
              }}
            />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 13, mb: 0.5 }}>Đến ngày</Typography>
            <DatePicker
              format="DD/MM/YYYY"
              value={dateRange.endDate ? dayjs(dateRange.endDate, 'DD/MM/YYYY') : null}
              onChange={handleEndDateChange}
              minDate={startDate || dayjs()}
              shouldDisableDate={(date) => !!startDate && date.isBefore(startDate, "day")}
              slotProps={{
                textField: {
                  size: 'medium',
                  sx: {
                    width: "100%",
                    '& .MuiOutlinedInput-root': {
                      borderRadius: "10px",
                      height: inputHeight,
                    },
                    '& label': { display: 'none' }, // ✅ Ẩn label
                  },
                }
              }}
            />
          </Box>
        </>
      )}
    </LocalizationProvider>
  );
}