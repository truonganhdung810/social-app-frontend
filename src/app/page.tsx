// app/page.tsx
// Nhập layout.tsx để sử dụng layout trong trang này

import RootLayout from "./layout";
import GetToken from "./components/GetToken";

export default function Home() {
  return (
    <RootLayout>
      <h1>Trang Chủ</h1>
      <GetToken />
    </RootLayout>
  );
}
