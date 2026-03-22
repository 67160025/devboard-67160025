import { createContext, useContext, useState } from "react";

// สร้าง context object เอาไว้เป็นช่องทางส่งข้อมูล favorites ให้ทุก component ในแอปเข้าถึงได้
// โดยไม่ต้องส่ง props ทีละชั้น
const FavoritesContext = createContext();

// ครอบ App ทั้งหมดใน main.jsx เพื่อให้ทุก component ข้างใน
// เข้าถึง favorites และ toggleFavorite ได้ผ่าน useFavorites()
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // เก็บ array ของ postId ที่ถูกใจ

  // ถ้า postId อยู่ใน favorites แล้ว → เอาออก, ถ้ายังไม่มี → เพิ่มเข้าไป
  // ถูกเรียกใช้ใน PostCard.jsx และ FavoritesPage.jsx เมื่อกดปุ่มหัวใจ
  function toggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId) // เอา postId นั้นออกจาก array
        : [...prev, postId], // เพิ่ม postId เข้าไปท้าย array
    );
  }

  return (
    // ส่ง favorites และ toggleFavorite ให้ทุก component ที่เรียก useFavorites()
    // ได้แก่ Navbar.jsx, PostCard.jsx, FavoritesPage.jsx
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// custom hook สำหรับเรียกใช้ context แทนที่จะเขียน useContext(FavoritesContext) ทุกครั้ง
export function useFavorites() {
  return useContext(FavoritesContext);
}