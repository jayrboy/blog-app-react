import { Link } from "react-router-dom";
import blogs from "../data/blogs";
import "./Blogs.css";

export default function Blog() {
  return (
    <div className="blogs-container">
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
