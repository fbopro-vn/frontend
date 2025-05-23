export default function formatDate(dateString: string): string {
    const parts = dateString.split(" "); // Tách chuỗi thành mảng dựa vào khoảng trắng
    return parts.length > 1 ? parts[1] : dateString; // Lấy phần thứ 2 (ngày tháng năm)
};
