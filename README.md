# Blog Application

- แอปพลิเคชัน บทความ
- การสร้างหน้าเว็บหลายๆ หน้าในหนึ่งแอปพลิเคชัน
- ด้วย React Router Rom (Version 6)

# JavaScript Object

- data/blogs.js

# แสดงรูปภาพ

- app/images/file.svg

# โครงสร้างคำสั่ง React Router

```sh
npm install react-router-dom
```

- src/App.js
- กำหนด BrowserRouter สำหรับติดตามการเปลี่ยนแปลง URL ทั้งหมดที่อยู่ในแอป
- กำหนด Routes สำหรับจัดการกลุ่มของเส้นทางที่ทำงานในแอป
- กำหนด Route สำหรับกำหนดเส้นทาง (path) และ component ที่จะทำวานในเส้นทางนั้น
  - กำหนด Navbar/style
  - กำหนด 404 Page Not Found
  - การนำรูปภาพเข้ามาใช้งาน
  - การกำหนด Global Style
  - วิธีใช้ Navigate
  - การแสดงข้อมูลบทความด้วยข้อมูล JavaScript Object
  - วิธีใช้ useParam
  - ดึงข้อมูลบทความด้วย map()
  - การสร้าง State เก็บข้อมูล
  - แสดงรายละเอียดบทความจากตัวแปร State
  - วิธีสร้างช่อง Search สำหรับค้นหาข้อมูล
  - การแสดงผลจากช่อง Search

```js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Blogs from './components/Blogs'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import Details from './components/Details'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/home" element={<Navigate to="/" />}></Route>
        <Route path="/info" element={<Navigate to="/about" />}></Route>
        <Route path="/blog/:id" element={<Details />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

# สร้างเมนู Navbar และกำหนด CSS ใน BrowserRouter

- components/Navbar.js

```js
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className="logo">
        <h3>Blog Application</h3>
      </Link>
      <Link to="/">หน้าแรก</Link>
      <Link to="/blogs">บทความทั้งหมด</Link>
      <Link to="/about">เกี่ยวกับเรา</Link>
    </nav>
  )
}
```

- components/Navbar.css

```css
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
}

.logo {
  margin-right: auto;
  padding-left: 10px;
  color: white;
}

a {
  color: white;
  text-decoration: none;
  margin-left: 12px;
  font-size: 18px;
  padding: 10px;
}

a:hover {
  color: orange;
}
```

- index.js

```css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  color: #333;
  text-align: center;
}

img {
  width: 550px;
  height: 500px;
}
```

# สร้าง Page Component และกำหนด CSS

1. components/Home.js

- การแสดงรูปภาพด้วยไฟล์ .svg

```js
import home from '../images/home.svg'

export default function Home() {
  return (
    <div className="container">
      <h2 className="title">หน้าแรกของเว็บไซต์</h2>
      <img src={home} alt="home" />
    </div>
  )
}
```

2. components/About.js

```js
import about from '../images/about.svg'

export default function About() {
  return (
    <div className="container">
      <h2 className="title">เกี่ยวกับเรา</h2>
      <img src={about} alt="about" />
    </div>
  )
}
```

3. components/Blogs.js

```js
import { Link } from 'react-router-dom'
import blogs from '../data/blogs'
import './Blogs.css'
import { useState, useEffect } from 'react'

export default function Blog() {
  const [search, setSearch] = useState('')
  const [filterBlog, setFilterBlog] = useState([])

  useEffect(() => {
    // กรองข้อมูลชื่อบทความ
    const result = blogs.filter((item) => item.title.includes(search))
    setFilterBlog(result)
  }, [search])

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
        {filterBlog.map((item) => (
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
  )
}
```

- components/Blogs.css

```css
.blogs-container {
  width: 96%;
  max-width: 1140px;
  margin: 0 auto;
}

.card {
  color: #333;
}

.search-container {
  margin: 30px 0;
}

.search-input {
  padding: 1em 1em;
  width: 96%;
  font-size: 18px;
}

.search-input:focus {
  outline: none;
}
```

4. components/NotFound.js

```js
import notfound from '../images/notfound.svg'

export default function NotFound() {
  return (
    <div className="container">
      <h3 className="title">ไม่พบหน้าเว็บ (404 Page Not Found)</h3>
      <img src={notfound} alt="notfound" />
    </div>
  )
}
```

5. components/Details.js

```js
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import blogs from '../data/blogs'
import './Detail.css'

export default function Details() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    // ดึงข้อมูลบทความ
    const result = blogs.find((item) => item.id === parseInt(id))
    setTitle(result.title)
    setImage(result.image_url)
    setContent(result.content)
    setAuthor(result.author)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container">
      <h2 className="title">บทความ : {title}</h2>
      <img src={image} alt={title} className="blog-image" />
      <div className="blog-detail">
        <strong>ผู้เขียนบทความ: {author}</strong>
        <p>{content}</p>
      </div>
    </div>
  )
}
```
