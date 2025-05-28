// utils/socket.ts
import { io } from "socket.io-client";

const socket = io("http://api.fbopro.vn"); // Địa chỉ backend của bạn

export default socket;
