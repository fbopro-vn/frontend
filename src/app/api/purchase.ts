// app/api/purchase.ts
import axios from 'axios';

export const postPurchase = async (data: any) => {
  console.log("📦 Dữ liệu gửi đi:", data);

  // Gọi API thực tế khi sẵn sàng:
  // const res = await axios.post('/api/purchase', data, {
  //   headers: { 'Content-Type': 'application/json' },
  // });
  // return res.data;

  return { success: true }; // 👉 Dùng để test giao diện
};
