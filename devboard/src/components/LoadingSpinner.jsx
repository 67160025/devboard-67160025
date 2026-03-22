// แสดงวงกลมหมุนกลางหน้าจอระหว่างรอโหลดข้อมูลจาก API
// ถูกเรียกใช้ใน PostList.jsx และ UserList.jsx ตอน loading state เป็น true
function LoadingSpinner() {
  return (
    <div style={{ textAlign: "center", padding: "3rem", color: "#718096" }}>
      <div
        style={{
          display: "inline-block",
          width: "40px",
          height: "40px",
          border: "4px solid #e2e8f0", // วงกลมสีเทาเป็นพื้นหลัง
          borderTopColor: "#1e40af", // ด้านบนสีน้ำเงิน ทำให้ดูเหมือนหมุน
          borderRadius: "50%", // ทำให้ div เป็นวงกลม
          animation: "spin 0.8s linear infinite", // หมุนต่อเนื่องตลอดเวลา
        }}
      />
      <p style={{ marginTop: "1rem" }}>กำลังโหลด...</p>
      {/* keyframes spin อยู่ในไฟล์นี้เลย ไม่ต้องไปเพิ่มใน index.css */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoadingSpinner;