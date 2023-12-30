import Home from "./components/Home";
import About from "./components/About";
import Blogs from "./components/Blogs";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
