interface User {
    id: string
    username: string
    password: string
    fullname: string
    phone: string
    address: string
    role: string
    email: string
    // avatar: string
    role: string,
    birthday: string
}

interface Product {
    id: string;
    name: string;
    group: string;
    unit: string;
    amount: number;
    costPrice: number;
    salePrice: number; // Số lượng
    stockQuantity: number;
        // stock_in: number;
    // stock_out: string;
    [key: string]: any; // Cho phép object có các key khác ngoài 4 key trên
  }

interface Material {
  material_id: string;
  material_name: string;
  material_group: string;
  unit: string;
  provider_name: string;
        // stock_in: number;
    // stock_out: string;
    [key: string]: any; // Cho phép object có các key khác ngoài 4 key trên
  }

interface Customer {
    id: string;
    name: string;
    phone: string;
    address: string;
}

interface Seller {
  id: string;
  fullname: string;
}


// OrderContext
interface Order {
    id: string; // Mã đơn hàng (tương ứng với Tab)
    orderDetails: Product[];
    vat: number;
    deposit: number;
    paidPayment: number;
    paymentMethod: string;
    paymentStatus: string;
    remainingPayment: number;
    seller: Seller;
    customer: Customer;
    note: string;
  }
  
  interface OrderContextProps {
    orders: Order[];
    activeOrderId: string | null;
    getTotalMoney: () => number;
    setActiveOrder: (id: string) => void;
    addOrder: () => void;
    addProductToOrder: (product: Product) => void;
    updateProductInOrder: (id: string, key: keyof Product, value: number) => void;
    removeOrder: (OrderId: string) => void;
    getTotalPriceProduct: () => number;
    getVatPrice: () => number;
    getActiveOrderVat: () => number;
    getActiveOrderDeposit: () => number;
    // getActiveOrderPaidPayment: () => number;
    getActiveOrderPaymentMethod: () => string;
    getActiveOrderPaymentStatus: () => boolean
    getActiveOrderNote: () => string;
    updateOrderField: (field: keyof Order, value: any) => void;
    updateActiveOrderCustomer: (customer: Customer) => void;
    updateActiveOrderSeller: (seller: Seller) => void;
    // updatePaidPayment: (value: number) => void,
    getActiveOrderSeller: () => Seller | null; 
    getFilteredOrder: (paidPayment: number) => void;
    getFilteredInvoice: (paidPayment: number) => void;
    updateOrderDate: (date: string) => void;
    validateOrderErrors,
    // Thanh Toán
    addSpecificOrder: (orderCode: string) => void;
    isCheckoutMode,  // ✅ Thêm trạng thái thanh toán
    checkIfCheckoutMode;
    updateOrderInCart,
    removeProductFromOrder,
    getActiveOrderPaidPayment,
    updateActiveOrderPaidPayment
  }

  
interface DateFilterProps {
  onDateChange: (startDate: string, endDate: string) => void;
  dateRange: { startDate: string; endDate: string };
}

interface CartItem {
  id_order: string;
  date: string | null;
  customer: string; // Chỉ lấy name, nên customer là string
  subtotal: number;
}