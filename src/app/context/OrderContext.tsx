"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from 'react-toastify';
import formatDate from '@/app/utils/formatDate';
import axios from "axios";
import useCustomerData from "../hooks/useCustomerData";
import { useSession } from "./SessionContext";

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { sessionId } = useSession(); // 🔹 Lấy sessionId từ layout
  // console.log("Session ID:", sessionId); 
  // const {CustomerData} = useCustomerData()
  // 🔹 Khởi tạo orders từ localStorage (nếu có)
  const [orders, setOrders] = useState<Order[]>(defaultOrders());
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string>("order-1");
  // ✅ Khôi phục dữ liệu từ localStorage khi sessionId có giá trị
useEffect(() => {
  if (sessionId) {
    const storedData = localStorage.getItem(`orderState-${sessionId}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setOrders(parsedData.orders);
      setActiveOrderId(parsedData.activeOrderId);
      setIsCheckoutMode(parsedData.isCheckoutMode);
    }
  }
}, [sessionId]);



  // ✅ Lưu tất cả dữ liệu vào `localStorage` mỗi khi thay đổi
  useEffect(() => {
  if (sessionId) {
    localStorage.setItem(
      `orderState-${sessionId}`,
      JSON.stringify({
        orders,
        activeOrderId,
        isCheckoutMode,
      })
    );
  }
}, [orders, activeOrderId, isCheckoutMode, sessionId]);
  // ✅ Định nghĩa đơn hàng mặc định
  function defaultOrders(): Order[] {
    return [
      {
        id: "order-1",
        orderDetails: [],
        deposit: 0,
        vat: 0,
        paymentStatus: 'Chờ thanh toán',
        paidPayment: 0,
        paymentMethod: "Chuyển khoản cá nhân",
        remainingPayment: 0,
        seller: { id: "", fullname: "" },
        customer: { id: "", name: "", phone: "", address: "" },
        note: "",
      },
    ];
  }

  // ✅ Đổi đơn hàng đang active & giữ lại dữ liệu cũ
  const setActiveOrder = (id: string) => {
    setActiveOrderId(id);

    checkIfCheckoutMode(id);  // ✅ Kiểm tra trạng thái thanh toán mỗi khi đổi đơn hàng
  };

  // ✅ Tạo một đơn hàng mới
  const addOrder = () => {
    const existingOrderNumbers = orders
      .filter(order => order.id.startsWith("order-"))
      .map(order => parseInt(order.id.replace(/\D/g, ""), 10))
      .filter(num => !isNaN(num));

    let newOrderNumber = 1;
    while (existingOrderNumbers.includes(newOrderNumber)) {
      newOrderNumber++;
    }

    const newOrderId = `order-${newOrderNumber}`;

    setOrders([...orders, {
      id: newOrderId,
      orderDetails: [],
      deposit: 0,
      vat: 0,
      paymentStatus: 'Chờ thanh toán',
      paidPayment: 0,
      paymentMethod: "Chuyển khoản cá nhân",
      remainingPayment: 0,
      seller: { id: "", fullname: "" },  // ✅ Đảm bảo luôn rỗng khi tạo tab mới
      customer: { id: "", name: "", phone: "", address: "" },
      note: ""
    }]);

    setActiveOrder(newOrderId);
  };


  // ✅ Lấy tiền vat (vat) của đơn hàng hiện tại
  const getActiveOrderVat = () => {
    const activeOrder = orders.find(order => order.id === activeOrderId);
    return activeOrder?.vat || 0;
  };

  // ✅ Lấy tiền cọc (deposit) của đơn hàng hiện tại
  const getActiveOrderDeposit = () => {
    const activeOrder = orders.find(order => order.id === activeOrderId);
    return activeOrder?.deposit || 0;
  };


  const getActiveOrderPaymentMethod = (): string => {
    const activeOrder = orders.find(order => order.id === activeOrderId);
    return activeOrder?.paymentMethod ?? "Chuyển khoản cá nhân";
  };

  const getActiveOrderPaymentStatus = (): boolean => {
    const activeOrder = orders.find(order => order.id === activeOrderId);
    const rawStatus = activeOrder?.paymentStatus;
  
    if (typeof rawStatus === 'string') {
      const normalized = (rawStatus as string).trim().toLowerCase();
      return normalized === 'chờ thanh toán';
    }
  
    // fallback
    return false;
  };
  
  

  const getActiveOrderNote = () => {
    const activeOrder = orders.find(order => order.id === activeOrderId);
    return activeOrder?.note ?? "";
  };

  // const getActiveOrderPaidPayment = () => {
  //   const activeOrder = orders.find(order => order.id === activeOrderId);
  //   return activeOrder?.paidPayment || 0;  // ✅ Trả về giá trị đúng cho từng đơn hàng
  // }; // Later tự tính


  // ✅ Cập nhật trường của đơn hàng hiện tại
  const updateOrderField = (field: keyof Order, value: any) => {
    // console.log(`Updating ${field} to:`, value); // ✅ Kiểm tra giá trị update
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === activeOrderId
          ? {
            ...order,
            [field]: value, // ✅ Ép kiểu Boolean
          }
          : order
      )
    );
  }


  const getActiveOrderSeller = (): Seller => {
    const activeOrder = orders.find(order => order.id === activeOrderId);
    return activeOrder?.seller || { id: "", fullname: "" }; // ✅ Nếu không có, trả về object rỗng
  };


  // ✅ Cập nhật nhân viên của đơn hàng đang active
  const updateActiveOrderSeller = (seller: Seller) => {
    console.log("Updating seller:", seller);  // Thêm log để kiểm tra seller
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === activeOrderId
          ? {
            ...order,
            seller: { id: seller.id, fullname: seller.fullname } // Cập nhật đầy đủ thuộc tính
          }
          : order
      )
    );
  };



  // ✅ Cập nhật khách hàng đơn hiện tại
  const updateActiveOrderCustomer = (customer: Customer) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === activeOrderId ? { ...order, customer } : order
      )
    );
  };

  // // ✅ Cập nhật `paidPayment` từ UnderInfo
  // const updatePaidPayment = (value: number) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) =>
  //       order.id === activeOrderId
  //         ? { ...order, paidPayment: value } // ✅ Lưu paidPayment vào đơn hàng
  //         : order
  //     )
  //   );
  // };

  // ✅ Thêm sản phẩm vào đơn hàng
  const addProductToOrder = (product: Product) => {
    if (!activeOrderId) return;

    let isProductExist = false;

    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === activeOrderId) {
          isProductExist = order.orderDetails.some((p) => p.id === product.id);
          if (isProductExist) return order; // Không thêm sản phẩm nữa
          return { ...order, orderDetails: [...order.orderDetails, product] };
        }
        return order;
      })
    );

    // ✅ Gọi toast.warning() bên ngoài để tránh lỗi render
    if (isProductExist) {
      toast.warning("⚠️ Sản phẩm đã tồn tại trong đơn hàng!", {
        position: "top-right",
        autoClose: 3000, // Đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      toast.success(`Đã thêm ${product.name} vào đơn hàng!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };


  // ✅ Cập nhật sản phẩm trong đơn hàng
  const updateProductInOrder = (id: string, key: keyof Product, value: number) => {
    if (!activeOrderId) return;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === activeOrderId
          ? {
            ...order,
            orderDetails: order.orderDetails.map((product) =>
              product.id === id ? { ...product, [key]: value } : product
            ),
          }
          : order
      )
    );
  };

  // ✅ Cập nhật ngày giờ của đơn hàng hiện tại
  const updateOrderDate = (date: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === activeOrderId ? { ...order, date } : order
      )
    );
  };

  const removeProductFromOrder = (id: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === activeOrderId
          ? {
              ...order,
              orderDetails: order.orderDetails.filter(p => p.id !== id)
            }
          : order
      )
    );
  };

  

  // ✅ Xóa một đơn hàng
  const removeOrder = (orderId: string) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.filter(order => order.id !== orderId);

      if (updatedOrders.length === 0) {
        // 🔹 Nếu tất cả đơn bị xóa, chỉ tạo lại 1 đơn mới tránh lỗi
        return [{
          id: "order-1",
          date: "",
          orderDetails: [],
          deposit: 0,
          paidPayment: 0,
          vat: 0,
          paymentStatus: 'Chờ thanh toán',
          paymentMethod: "Chuyển khoản cá nhân",
          remainingPayment: 0,
          seller: { id: "", fullname: "" },
          customer: { id: "", name: "", phone: "", address: "" },
          note: ""
        }];
      }
      return updatedOrders;
    });

    // 🔹 Đảm bảo active tab là tab ngoài cùng bên phải khi xóa tab đang active
    if (activeOrderId === orderId) {
      const remainingOrders = orders.filter(order => order.id !== orderId);
      const newActiveOrder = remainingOrders.length > 0 ? remainingOrders[remainingOrders.length - 1].id : "order-1";
      setActiveOrder(newActiveOrder);
    }
  };



  // ✅ Tính tổng tiền của sản phẩm trong đơn hàng
  const getTotalPriceProduct = () => {
    const activeOrder = orders.find(order => order.id === activeOrderId);

    if (!activeOrder || !Array.isArray(activeOrder.orderDetails)) return 0; // ✅ Đảm bảo `products` là mảng

    return activeOrder.orderDetails.reduce(
      (total, product) => total + (product.amount * product.salePrice),
      0
    );
  };


  // ✅ Tính tổng tiền của sản phẩm trong đơn hàng
  const getVatPrice = () => {
    const activeOrder = orders.find(order => order.id === activeOrderId);
    if (!activeOrder) return 0;

    return (getTotalPriceProduct() * activeOrder.vat / 100);
  };

  // // Tổng tiền cần thu từ khách = Tổng tiền sản phẩm + VAT - Deposit
  // const getTotalMoney = () => {
  //   const activeOrder = orders.find(order => order.id === activeOrderId);
  //   if (!activeOrder) return 0;
  
  //   const totalProduct = getTotalPriceProduct();
  //   const vatAmount = (totalProduct * activeOrder.vat) / 100;
  //   const deposit = activeOrder.deposit || 0;
  //   const paidPayment = activeOrder.paidPayment || 0;
  
  //   const remaining = totalProduct + vatAmount - deposit - paidPayment;
  //   return remaining;
  // };

  const getTotalMoney = () => {
    const activeOrder = orders.find(order => order.id === activeOrderId)
    if (!activeOrder) return 0;

    const totalProduct = getTotalPriceProduct();
    const vatAmount = (totalProduct * activeOrder.vat) / 100;
    return totalProduct + vatAmount
  }

  // Giá trị Thu tiền khách = 
  // console.log("Giá trị thu tiền khách", totalNPwDeposit)
  // Lọc dữ liệu cần gửi tới Backend
  const getFilteredOrder = () => {
    const activeOrder = orders.find(order => order.id === activeOrderId);
    if (!activeOrder) return null;
  
    const totalMoney = getTotalMoney();
  

    // Công nợ và chờ thanh toán
    return {
      seller: {
        id: activeOrder.seller.id,
        fullname: activeOrder.seller.fullname
      },
      customer: {
        id: activeOrder.customer.id,
        name: activeOrder.customer.name,
        phone: activeOrder.customer.phone,
        address: activeOrder.customer.address
      },
      orderDetails: activeOrder.orderDetails.map(product => ({
        id: product.id,
        name: product.name,
        amount: product.amount,
        costPrice: product.costPrice,
        salePrice: product.salePrice,
      })),
      vat: activeOrder.vat,
      totalMoney: totalMoney, // Sử dụng tổng tiền đã tính chính xác
      deposit: activeOrder.deposit,
      paymentMethod: activeOrder.paymentMethod,
   paymentStatus: activeOrder.paymentStatus,

      remainingPayment: totalMoney - activeOrder.deposit,
      note: activeOrder.note,
      createdBy: {
        id: activeOrder.seller.id,
        fullname: activeOrder.seller.fullname
      },
    };
  };

  const getFilteredInvoice = (paidPayment: number = 0) => {
    const activeOrder = orders.find(order => order.id === activeOrderId);

    if (!activeOrder) return null;
  
    const totalMoney = getTotalMoney();
    const remainingPayment = totalMoney - activeOrder.deposit - paidPayment
    let newStatus = 'Đã thanh toán';
    // // Các trường hợp paymentStatus
    if (remainingPayment > 0 && activeOrder.paymentStatus == 'Công nợ') {
      newStatus = 'Công nợ'
    } 
    console.log('Active order hien ti', activeOrder) 
    return {
      seller: {
        id: activeOrder.seller.id,
        fullname: activeOrder.seller.fullname
      },
      customer: {
        id: activeOrder.customer.id,
        name: activeOrder.customer.name,
        phone: activeOrder.customer.phone,
        address: activeOrder.customer.address
      },
      orderDetails: activeOrder.orderDetails.map(product => ({
        id: product.id,
        name: product.name,
        amount: product.amount,
        costPrice: product.costPrice,
        salePrice: product.salePrice,
      })),
      vat: activeOrder.vat,
      totalMoney: totalMoney, // Sử dụng tổng tiền đã tính chính xác
      deposit: activeOrder.deposit + paidPayment,
      paymentMethod: activeOrder.paymentMethod,
      paymentStatus:  newStatus, //
      remainingPayment:  remainingPayment,
      note: activeOrder.note,
      createdBy: {
        id: activeOrder.seller.id,
        fullname: activeOrder.seller.fullname
      },
    };
  };
  
  const addSpecificOrder = async (orderId: string) => {
    try {
      const accessToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
      if (!accessToken) {
        console.error("❌ Không tìm thấy access token!");
        return;
      }

      const response = await axios.get(`http://api.sdc.com:8000/v1/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const orderData = response.data;
      if (!orderData) {
        console.error("❌ Không tìm thấy dữ liệu đơn hàng!");
        return;
      }

      console.log("✅ Dữ liệu đơn hàng:", orderData);

      // Kiểm tra nếu đơn hàng đã tồn tại thì chỉ active thôi
      const existingOrder = orders.find(order => order.id === orderId);
      if (existingOrder) {
        setActiveOrder(orderId);
        return;
      }

      // Thêm đơn hàng mới vào danh sách orders
      setOrders(prevOrders => [
        ...prevOrders,
        {
          id: orderId,
          ...orderData,
        },
      ]);

      // Chuyển sang đơn hàng vừa thêm
      setTimeout(() => setActiveOrder(orderId), 100);

      return orderData;
    } catch (error) {
      console.error("❌ Lỗi khi thêm đơn hàng:", error);
    }
  };



  // Kiểm tra lỗi đặt hàng
  // ✅ Hàm kiểm tra lỗi và hiển thị toast tương ứng
  // ✅ Hàm kiểm tra lỗi và hiển thị toast đúng cú pháp "Vui lòng ..."
  const validateOrderErrors = (mode: "order" | "checkout" = "order", paidPayment: number = 0) => {
    const activeOrder = orders.find(order => order.id === activeOrderId);
    if (!activeOrder) return false;
  
    let errorMessages = [];
  
    // Kiểm tra sản phẩm
    if (activeOrder.orderDetails.length === 0) {
      errorMessages.push("thêm sản phẩm");
    }
  
    // Kiểm tra khách hàng
    if (!activeOrder.customer.name || !activeOrder.customer.phone) {
      errorMessages.push("nhập khách hàng");
    }
  
    // Kiểm tra seller
    if (!activeOrder.seller.fullname) {
      errorMessages.push("nhập sale");
    }
  
    // Kiểm tra giá bán của tất cả sản phẩm
    const productsWithZeroPrice = activeOrder.orderDetails
      .filter(product => product.salePrice <= 0)
      .map(product => product.id);
  
    if (productsWithZeroPrice.length > 0) {
      errorMessages.push(`nhập giá bán mã sản phẩm ${productsWithZeroPrice.join(", ")}`);
    }
  
    const totalPrice = getTotalPriceProduct() + getVatPrice();
    const deposit = getActiveOrderDeposit();
  
    if (mode === "order") {
      // Kiểm tra thu tiền khách khi đặt hàng
      if (totalPrice - deposit < 0) {
        errorMessages.push("kiểm tra thu tiền khách không được âm");
      }
    } else if (mode === "checkout") {
      // Kiểm tra thu tiền khách khi thanh toán
      const remainingPayment = totalPrice - deposit - paidPayment;
      if (remainingPayment < 0) {
        errorMessages.push("thu tiền khách không được âm");
      }
    }
  
    if (errorMessages.length > 0) {
      toast.error(`⚠️ Vui lòng ${errorMessages.join(", ")}!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return false;
    }
  
    return true;
  };
  
  
  // Chế độ Thanh toán
  const checkIfCheckoutMode = (orderId: string) => {
    if (orderId.startsWith("DH") || "") {
      setIsCheckoutMode(true); // ✅ Nếu là DHxxx -> Bật chế độ thanh toán
    } else {
      setIsCheckoutMode(false); // ✅ Nếu không phải DHxxx -> Giữ giao diện đặt hàng
    }
  };

  // // Update Product into Cart
  const updateOrderInCart = async (orderId: string, paidPayment: number = 0) => {
    try {
      const activeOrder = orders.find(order => order.id === orderId);
      if (!activeOrder) {
        console.error("❌ Không tìm thấy đơn hàng trong context!");
        return null;
      }
  
      const accessToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
      if (!accessToken) {
        toast.error("❌ Vui lòng đăng nhập để cập nhật đơn hàng!");
        return null;
      }

      const totalMoney = getTotalMoney()
  
      const formattedOrder = {
        seller: {
          id: activeOrder.seller.id,
          fullname: activeOrder.seller.fullname,
        },
        customer: {
          id: activeOrder.customer.id,
          name: activeOrder.customer.name,
          phone: activeOrder.customer.phone,
          address: activeOrder.customer.address,
        },
        orderDetails: activeOrder.orderDetails.map(product => ({
          id: product.id,
          name: product.name,
          amount: product.amount,
          salePrice: product.salePrice,
        })),
        vat: activeOrder.vat,
        totalMoney: activeOrder.orderDetails.reduce((sum, p) => sum + p.amount * p.salePrice, 0) + activeOrder.vat,
        deposit: activeOrder.deposit + paidPayment,
        remainingPayment: totalMoney - activeOrder.deposit - paidPayment,
        paymentMethod: activeOrder.paymentMethod,
        paymentStatus: activeOrder.paymentStatus,
        note: activeOrder.note,
      };
  
      const response = await axios.patch(`http://api.sdc.com:8000/v1/orders/${orderId}`, formattedOrder, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      if (response.status === 200) {
        toast.success("✅ Cập nhật đơn hàng thành công!");
        return response.data;
      } else {
        toast.error("❌ Cập nhật đơn hàng thất bại!");
        return null;
      }
  
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật đơn hàng:", error);
      toast.error("❌ Lỗi khi cập nhật đơn hàng!");
      return null;
    }
  };



  const getActiveOrderPaidPayment = () => {
  const activeOrder = orders.find(order => order.id === activeOrderId);
  return activeOrder?.paidPayment || 0;
};

const updateActiveOrderPaidPayment = (value: number) => {
  setOrders(prev =>
    prev.map(order =>
      order.id === activeOrderId
        ? { ...order, paidPayment: value }
        : order
    )
  );
};

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrderId,
        setActiveOrder,
        addOrder,
        addProductToOrder,
        updateProductInOrder,
        removeProductFromOrder,
        removeOrder,
        getTotalPriceProduct,
        getVatPrice,
        getTotalMoney,
        getActiveOrderVat,
        getActiveOrderDeposit,
        getActiveOrderPaymentMethod,
        getActiveOrderPaymentStatus,
        getActiveOrderNote,
        updateOrderField,
        updateActiveOrderCustomer,
        updateActiveOrderSeller,
        // updatePaidPayment,
        getActiveOrderSeller,
        getFilteredOrder,
        getFilteredInvoice,
        updateOrderDate,
        validateOrderErrors,
        addSpecificOrder, // ✅ Thêm hàm mới vào context
        isCheckoutMode,  // ✅ Thêm trạng thái thanh toán
        checkIfCheckoutMode,
        updateOrderInCart,
        getActiveOrderPaidPayment,
        updateActiveOrderPaidPayment
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
