import { configureStore } from '@reduxjs/toolkit';
import monthReducer from '../features/monthSlice';  // Import reducer từ headerSlice
import authReducer from '../features/authSlice';
import userReducer from '../features/users/userSlice'
import columnUserReducer from '../features/columnUserSlice';
import columnInvoiceReducer from '../features/columnInvoiceSlice';
import columnMerchandiseInputReducer from '../features/Merchandise/columnMerchandiseInputSlice';
import columnMerchandiseOutputReducer from '../features/Merchandise/columnMerchandiseOutputSlice';
import columnOrderReducer from '../features/columnOrderSlice';
import columnCustomerReducer from '../features/columnCustomerSlice';
import columnProviderReducer from '../features/columnProviderSlice';
import columnExpenseReducer from '../features/columnExpenseSlice';
import purchaseReducer from '../features/Purchase/PurchaseSlice';

// Order
import orderCartReducer from '../features/order/orderCartSlice';
import orderCustomerReducer from '../features/order/orderCustomerSlice';
import orderStaffReducer from '../features/order/orderStaffSlice';
import orderModalReducer from '../features/order/orderModalSlice';
import orderTabReducer from '../features/order/orderTabSlice';

// Cấu hình Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    month: monthReducer,
    columnUser: columnUserReducer,
    columnInvoice: columnInvoiceReducer,
    columnMerchandiseInput: columnMerchandiseInputReducer,
    columnMerchandiseOutput: columnMerchandiseOutputReducer,
    columnOrder: columnOrderReducer,
    columnCustomer: columnCustomerReducer,
    columnProvider: columnProviderReducer,
    columnExpense: columnExpenseReducer,
    purchase: purchaseReducer,
    orderCart: orderCartReducer, //order
    orderCustomer: orderCustomerReducer,
    orderStaff: orderStaffReducer,
    orderModal: orderModalReducer,
    orderTab: orderTabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
