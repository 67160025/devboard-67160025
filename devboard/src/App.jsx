import { BrowserRouter, Routes, Route } from "react-router-dom"; // จัดการ routing ทั้งหมดของแอป
import { FavoritesProvider } from "./context/FavoritesContext"; // ครอบทั้งแอปเพื่อให้ทุกหน้าเข้าถึง favorites state ได้
import Navbar from "./components/Navbar"; // แสดงตลอดทุกหน้า ไม่ว่าจะอยู่ route ไหน
import HomePage from "./pages/HomePage"; // หน้าหลัก /
import PostDetailPage from "./pages/PostDetailPage"; // หน้าโพสต์ /posts/:id
import ProfilePage from "./pages/ProfilePage"; // หน้าสมาชิก /profile
import FavoritesPage from "./pages/FavoritesPage"; // หน้าถูกใจ /favorites
import NotFoundPage from "./pages/NotFoundPage"; // หน้า 404 สำหรับ URL ที่ไม่มีในแอป

function App() {
  return (
    // FavoritesProvider ครอบไว้ชั้นนอกสุด ทำให้ Navbar, PostCard, FavoritesPage
    // เข้าถึง favorites state เดียวกันได้ทั้งหมด
    <FavoritesProvider>
      {/* BrowserRouter เปิดใช้งานระบบ routing ทั้งหมด
          ต้องครอบ Navbar และ Routes ไว้ด้วยกัน เพื่อให้ Link ใน Navbar ทำงานได้ */}
      <BrowserRouter>
        <Navbar /> {/* อยู่นอก Routes ทำให้แสดงทุกหน้าโดยไม่ต้องกำหนดซ้ำใน Route */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} /> {/* :id รับค่าตัวเลขโพสต์จาก URL */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* * จับทุก URL ที่ไม่ match route ข้างบน */}
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;