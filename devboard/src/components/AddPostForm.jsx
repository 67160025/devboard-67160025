import { useState } from "react";

// รับ onAddPost มาจาก PostList.jsx หรือ App.jsx แล้วแต่ว่า posts state อยู่ที่ไหน
function AddPostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // ป้องกัน browser reload หน้าเมื่อกด submit
    if (!title.trim() || !body.trim()) return; // ถ้ากรอกแค่ space ไม่ให้ส่ง

    onAddPost({ title, body }); // ส่ง { title, body } กลับไปให้ PostList.jsx หรือ App.jsx เพิ่มเข้าลิสต์
    setTitle(""); // ล้างช่องกรอกให้ว่างหลังจากส่งแล้ว
    setBody("");
  }

  return (
    <form
      onSubmit={handleSubmit} // กด Enter ในช่องไหนก็ submit ได้ ไม่ต้องคลิกปุ่มเสมอไป
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "#f7fafc",
      }}
    >
      <h3 style={{ margin: "0 0 0.75rem", color: "#2d3748" }}>
        เพิ่มโพสต์ใหม่
      </h3>

      <input
        type="text"
        placeholder="หัวข้อโพสต์"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // อัปเดตค่าในช่องทุกครั้งที่พิมพ์
        maxLength={100} // พิมพ์ได้สูงสุด 100 ตัวอักษร
        style={{
          width: "100%",
          padding: "0.5rem 1rem",
          marginBottom: "0.25rem",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "1rem",
          boxSizing: "border-box", // ป้องกัน input กว้างเกินกรอบ
        }}
      />

      {/* ตัวเลขนับถอยหลังใต้ช่อง title เปลี่ยนเป็นสีแดงเมื่อพิมพ์ถึง 90 ตัว */}
      <p
        style={{
          textAlign: "right",
          fontSize: "0.85rem",
          color: title.length >= 90 ? "#e53e3e" : "#718096",
          margin: "0 0 0.75rem",
        }}
      >
        {title.length}/100
      </p>

      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body}
        onChange={(e) => setBody(e.target.value)} // อัปเดตค่าในช่องทุกครั้งที่พิมพ์
        rows={3} // ความสูงเริ่มต้น 3 บรรทัด ลากขยายได้
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          resize: "vertical", // ลากขยายได้แค่แนวตั้ง ไม่ให้เกินกรอบแนวนอน
          boxSizing: "border-box",
        }}
      />

      {/* type="submit" ทำให้ปุ่มนี้ส่ง form ได้ ถ้าเปลี่ยนเป็น type="button" จะไม่ทำงาน */}
      <button
        type="submit"
        style={{
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        โพสต์
      </button>
    </form>
  );
}

export default AddPostForm;