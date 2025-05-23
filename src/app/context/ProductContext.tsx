"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useOrderContext } from "./OrderContext"; // ✅ Import OrderContext


interface ProductContextProps {
  addProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { addProductToOrder } = useOrderContext(); // ✅ Dùng OrderContext để đẩy sản phẩm vào đơn hàng

  const addProduct = (product: Product) => {
    addProductToOrder(product); // ✅ Thêm sản phẩm vào Tab hiện tại
  };

  return <ProductContext.Provider value={{ addProduct }}>{children}</ProductContext.Provider>;

};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
