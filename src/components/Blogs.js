import { Link } from "react-router-dom";
import blogs from "../data/blogs";
import "./Blogs.css";
import { useState } from "react";

export default function Blog() {
  const [search, setSearch] = useState("");

  return (
    <div className="blogs-container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="ค้นหาบทความ"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <article>
        {blogs.map((item) => (
          <Link to={`/blog/${item.id}`} key={item.id}>
            <div className="card" key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.content.substring(0, 300)}</p>
              <hr />
            </div>
          </Link>
        ))}
      </article>
    </div>
  );
}
