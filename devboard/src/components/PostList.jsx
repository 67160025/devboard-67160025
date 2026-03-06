import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 1rem",
          marginBottom: "1rem",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "1rem",
          boxSizing: "border-box",
        }}
      />
      <PostCount count={filteredPosts.length} />
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;