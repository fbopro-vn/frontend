export default function removeVietnameseTones(str: string): string {
    return str
    .normalize("NFD") // Tách dấu
    .replace(/[\u0300-\u036f]/g, "") // Xoá dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}
