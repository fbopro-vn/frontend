// import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// const BACKEND_URL = "https://my-backend.com/api/customers"; // URL API backend thực tế

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === "POST") {
//         try {
//             const { name, phone, address } = req.body;

//             // Gửi dữ liệu lên backend thực tế
//             const backendResponse = await axios.post(BACKEND_URL, { name, phone, address });

//             // Trả về phản hồi từ backend
//             return res.status(backendResponse.status).json(backendResponse.data);
//         } catch (error) {
//             console.error("Lỗi khi gửi dữ liệu lên backend:", error);
//             return res.status(500).json({ message: "Lỗi khi gửi dữ liệu lên backend" });
//         }
//     }

//     return res.status(405).json({ message: "Method Not Allowed" });
// }
