import { NextResponse } from "next/server";
const SECRET_KEY = "TRUONGANHDUNG174187165";
import { cookies } from "next/headers";

export async function middleware(request) {
  //   // Lấy token từ cookie
  //   const cookieStore = await cookies();
  //   const token = cookieStore.get("token");
  //   console.log("Check Token:", token);
  //   // Kiểm tra nếu không có token thì chuyển hướng tới trang login
  //   if (!token) {
  //     //return NextResponse.redirect(new URL("/login", request.url));
  //   }
  //   try {
  //     // Giải mã token để lấy thông tin user
  //     const user = jwt.verify(token, SECRET_KEY);
  //     console.log("User từ token:", user);
  //   } catch (error) {
  //     console.error("Token không hợp lệ:", error);
  //     // return NextResponse.redirect(new URL("/login", request.url));
  //   }
  //   return NextResponse.next();
}

// Áp dụng middleware cho trang root
export const config = {
  matcher: ["/"],
};
