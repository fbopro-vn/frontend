// utils/socket.ts
import { io } from "socket.io-client";

const socket = io("http://api.sdc.com:8000"); // Địa chỉ backend của bạn

export default socket;
