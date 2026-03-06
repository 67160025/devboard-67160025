import { useState } from "react";

function AddPostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "white",
      }}
    >
      <h3 style={{ margin: "0 0 1rem", color: "#2d3748" }}>เพิ่มโพสต์ใหม่</h3>
      <input
        type="text"
        placeholder="หัวข้อโพสต์"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 1rem",
          marginBottom: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "1rem",
          boxSizing: "border-box",
        }}
      />
      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          padding: "0.5rem 1rem",
          marginBottom: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "1rem",
          boxSizing: "border-box",
          resize: "vertical",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          background: "#1e40af",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "0.5rem 1.5rem",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        เพิ่มโพสต์
      </button>
    </div>
  );
}

export default AddPostForm;