import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import blogs from "../data/blogs";

export default function Details() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    // ดึงข้อมูลบทความ
    const result = blogs.find((item) => item.id === parseInt(id));
    setTitle(result.title);
    setImage(result.image_url);
    setContent(result.content);
    setAuthor(result.author);
  }, [id]);

  return (
    <>
      <h2>รายละเอียดบทความ : {id}</h2>
    </>
  );
}
