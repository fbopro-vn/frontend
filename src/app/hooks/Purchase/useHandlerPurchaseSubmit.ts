// app/hooks/useHandlePurchaseSubmit.ts
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import usePurchaseMutation from "./usePurchaseMutation";
import {
  selectSelectedMaterials,
  selectVat,
  selectPaidAmount,
  selectPaymentMethod,
  selectTotalPayable,
  selectDebt,
} from "@/app/redux/store/selectors/purchaseSelector";

const useHandlePurchaseSubmit = () => {
  const materials = useSelector(selectSelectedMaterials);
  const vat = useSelector(selectVat);
  const amount_paid = useSelector(selectPaidAmount);
  const total_money = useSelector(selectTotalPayable);
  const remaining_payment = useSelector(selectDebt);
  const paymentMethod = useSelector(selectPaymentMethod);

  const { trigger, isMutating } = usePurchaseMutation();

  const handleSubmit = () => {
    if (!materials.length) {
        toast.error("Chưa chọn vật tư nào!");
        return;
    }
    
   // ✅ Kiểm tra tổ hợp lỗi: amount hoặc costPrice bị sai
    const invalidEntries = materials.filter(
        item => !item.amount || item.amount <= 0 || !item.costPrice || item.costPrice <= 0
    );

    if (invalidEntries.length > 0) {
        const errorList = invalidEntries.map(item => {
          const errors = [];
          if (!item.amount || item.amount <= 0) errors.push("số lượng");
          if (!item.costPrice || item.costPrice <= 0) errors.push("giá nhập");
          return `+ ${item.material_id} thiếu ${errors.join(" và ")}`;
        });
      
        toast.error(`Kiểm tra vật tư:\n${errorList.join('\n')}`, {
          style: { whiteSpace: 'pre-line' }, // ✅ Cho phép xuống dòng
        });
      
        return;
    }
    
    // ✅ Kiểm tra số tiền trả không được lớn hơn công nợ
    if (remaining_payment > 0) {
        toast.error(`Tiền trả ${amount_paid.toLocaleString('vi-VN')} VND cho nhà cung cấp vượt quá số tiền công nợ`);
        return;
    }
    const payload = {
      purchase_details: materials.map(item => ({
        material_id: item.material_id,
        material_name: item.material_name,
        amount: item.amount,
        costPrice: item.costPrice,
        total_price: item.total_price,
      })),
      vat,
      amount_paid,
      total_money,
      remaining_payment,
      paymentMethod,
    };

    trigger(payload)
      .then(() => toast.success("🟢 Gửi thành công!"))
      .catch((err) => {
        console.error("🔴 Gửi thất bại:", err);
        toast.error("🔴 Lỗi khi gửi dữ liệu.");
      });
  };

  return {
    handleSubmit,
    isLoading: isMutating,
  };
};


export default useHandlePurchaseSubmit