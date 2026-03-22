import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // API สำหรับ render React ลงใน browser
import './index.css' // โหลด global CSS ที่ใช้กับทั้งแอป
import App from './App.jsx' // component หลักที่ครอบทุกอย่างไว้

// getElementById('root') คือ <div id="root"> ใน index.html ที่ React จะ render ลงไป
createRoot(document.getElementById('root')).render(
  // StrictMode ไม่มีผลต่อหน้าเว็บที่ผู้ใช้เห็น แต่ช่วยเตือน bug ใน development
  // เช่น เรียก useEffect สองรอบเพื่อตรวจหา side effect ที่ไม่ควรเกิด
  <StrictMode>
    <App />
  </StrictMode>,
)