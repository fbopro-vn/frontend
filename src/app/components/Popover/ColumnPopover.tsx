import React from "react";
import { Checkbox, FormGroup, FormControlLabel, Typography, Box, Popover, IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { toggleColumn as toggleColumnUser} from '../../redux/features/columnUserSlice';
import { toggleColumn as toggleColumnInvoice } from '../../redux/features/columnInvoiceSlice';  // Import hành động từ columnInvoiceSlice
import { toggleColumn as toggleColumnMerchandiseOutput } from '../../redux/features/Merchandise/columnMerchandiseOutputSlice';  // Import hành động từ columnMerchandiseSlice
import { toggleColumn as toggleColumnMerchandiseInput } from '../../redux/features/Merchandise/columnMerchandiseInputSlice';
import { toggleColumn as toggleColumnOrder } from '../../redux/features/columnOrderSlice';  // Import hành động từ columnOrderSlice
import { toggleColumn as toggleColumnCustomer } from '../../redux/features/columnCustomerSlice';  // Import hành động từ columnOrderSlice
import { toggleColumn as toggleColumnProvider } from '../../redux/features/columnProviderSlice';  // Import hành động từ columnOrderSlice
import { toggleColumn as toggleColumnExpense } from '../../redux/features/columnExpenseSlice'; 
import ViewListIcon from '@mui/icons-material/ViewList';
import { RootState } from '@/app/redux/store/store';
import { usePathname } from "next/navigation";
import Tooltip from '@mui/material/Tooltip';

// Props để nhận cấu trúc cột
interface ColumnFilterPopoverProps {
  headColumn: { [key: string]: string };
}

const ColumnFilterPopover: React.FC<ColumnFilterPopoverProps> = ({ headColumn }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  // Array URL pathname
  const userPaths = ['phan_quyen'];
  const invoicePaths = ['nhap_thu', 'giao_dich/hoa_don'];
  const merchandiseOutputPaths = ['hang_hoa/ban_ra']; // Thêm các URL liên quan đến "hang_hoa"
  const merchandiseInputPaths = ['hang_hoa/nhap_vao']; // Thêm các URL liên quan đến "hang_hoa"
  const orderPaths = ['giao_dich/dat_hang']; // Thêm các URL liên quan đến "don_hang"
  const customerPaths = ['doi_tac/khach_hang']; // Thêm các URL liên quan đến "don_hang"
  const providerPaths = ['doi_tac/nha_cung_cap']; // Thêm các URL liên quan đến "don_hang"
  const expensePaths = ['nhap_chi']
  // Sử dụng pathname để chọn cột phù hợp
  const selectedColumns =
  merchandiseOutputPaths.some(path => pathname.includes(path))
    ? useSelector((state: RootState) => state.columnMerchandiseOutput.checkedColumns) // ✅ sửa đúng slice
    : merchandiseInputPaths.some(path => pathname.includes(path))
    ? useSelector((state: RootState) => state.columnMerchandiseInput.checkedColumns)
    : userPaths.some(path => pathname.includes(path))
    ? useSelector((state: RootState) => state.columnUser.checkedColumns)
    : orderPaths.some(path => pathname.includes(path))
    ? useSelector((state: RootState) => state.columnOrder.checkedColumns)
    : customerPaths.some(path => pathname.includes(path))
    ? useSelector((state: RootState) => state.columnCustomer.checkedColumns)
    : providerPaths.some(path => pathname.includes(path))
    ? useSelector((state: RootState) => state.columnProvider.checkedColumns)
    : expensePaths.some(path => pathname.includes(path))
    ? useSelector((state: RootState) => state.columnExpense.checkedColumns)
    : useSelector((state: RootState) => state.columnInvoice.checkedColumns); // fallback


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "column-filter-popover" : undefined;

  const handleToggleColumn = (column: string) => {
    if (merchandiseOutputPaths.some(path => pathname.includes(path))) {
      dispatch(toggleColumnMerchandiseOutput(column));  // Dispatch hành động toggleColumn cho columnMerchandise
    } else if (merchandiseInputPaths.some(path => pathname.includes(path))) {
      dispatch(toggleColumnMerchandiseInput(column)); 
    } else if (userPaths.some(path => pathname.includes(path))) {
      dispatch(toggleColumnUser(column))
    } else if (orderPaths.some(path => pathname.includes(path))) {
      dispatch(toggleColumnOrder(column));  // Dispatch hành động toggleColumn cho columnInvoice
    } else if (invoicePaths.some(path => pathname.includes(path))) {
      dispatch(toggleColumnInvoice(column));  
    } else if (customerPaths.some(path => pathname.includes(path))) {
      dispatch(toggleColumnCustomer(column));  
    } else if (expensePaths.some(path => pathname.includes(path))) {
      dispatch(toggleColumnExpense(column));  
    } else { 
      dispatch(toggleColumnProvider(column));          
    }  
      // Dispatch hành động toggleColumn cho columnOrder
  };

  return (
    <Box>
      <Tooltip title='Hiển thị cột'>
        <IconButton aria-describedby={id} onClick={handleClick} color="primary">
          <ViewListIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        key={JSON.stringify(selectedColumns)}  // Thêm key động để trigger lại render
      >
        <Box sx={{ p: 2, maxHeight: 450, width: 450 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Chọn cột hiển thị
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <FormGroup>
              {Object.keys(headColumn).slice(0, Math.ceil(Object.keys(headColumn).length / 2)).map((column) => (
                <FormControlLabel
                  key={column}
                  control={
                    <Checkbox
                      checked={selectedColumns.includes(column)}
                      onChange={() => handleToggleColumn(column)} // Thay thế toggleColumn
                    />
                  }
                  label={headColumn[column]}
                />
              ))}
            </FormGroup>
            <FormGroup>
              {Object.keys(headColumn).slice(Math.ceil(Object.keys(headColumn).length / 2)).map((column) => (
                <FormControlLabel
                  key={column}
                  control={
                    <Checkbox
                      checked={selectedColumns.includes(column)}
                      onChange={() => handleToggleColumn(column)} // Thay thế toggleColumn
                    />
                  }
                  label={headColumn[column]}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default ColumnFilterPopover;



