// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtDecode } from 'jwt-decode';

// // Các route public: ai cũng truy cập được
// const publicPaths = ['/', '/login'];

// // Các quyền hạn yêu cầu cho một số route
// const restrictedPaths: { [path: string]: string[] } = {
//   '/nhap_chi': ['admin'],
//   '/nhap_thu': ['admin'],
//   // Chỉ liệt kê những route cần kiểm soát quyền
// };

// interface DecodedToken {
//   role?: string;
//   exp?: number;
//   [key: string]: any;
// }

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get('access_token')?.value;

//   // ✅ Nếu đang ở public path -> cho phép luôn
//   if (publicPaths.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // ❌ Không có token -> chặn
//   if (!token) {
//     console.warn(`[Middleware] Không tìm thấy token, chặn truy cập ${pathname}`);
//     return NextResponse.rewrite(new URL('/404', request.url));
//   }

//   try {
//     const decoded = jwtDecode<DecodedToken>(token);

//     if (!decoded || !decoded.role) {
//       console.error('[Middleware] Token không hợp lệ: thiếu role');
//       return NextResponse.rewrite(new URL('/404', request.url));
//     }

//     const userRole = decoded.role;
//     console.log(`[Middleware] Role người dùng: ${userRole}`);

//     // ✅ Nếu path hiện tại có yêu cầu phân quyền
//     const restrictedPathsMatched = Object.keys(restrictedPaths).filter(path => pathname.startsWith(path));

//     if (restrictedPathsMatched.length > 0) {
//       for (const restrictedPath of restrictedPathsMatched) {
//         const allowedRoles = restrictedPaths[restrictedPath];
//         if (!allowedRoles.includes(userRole)) {
//           console.warn(`[Middleware] Role ${userRole} không được phép truy cập ${pathname}`);
//           return NextResponse.rewrite(new URL('/404', request.url));
//         }
//       }
//     }

//     // ✅ Nếu token hợp lệ và đúng quyền -> cho phép truy cập
//     return NextResponse.next();
//   } catch (error) {
//     console.error('[Middleware] Lỗi khi decode token:', error);
//     return NextResponse.rewrite(new URL('/404', request.url));
//   }
// }

// // Áp dụng middleware cho tất cả route trừ file tĩnh
// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico).*)',
//   ],
// };
