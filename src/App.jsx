import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./views/Home.jsx";
import Blog from './views/Blog.jsx';
import Gallery from "./views/Gallery.jsx";
import Contact from "./views/Contact.jsx";
import NotFound from "./views/NotFound.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery/*" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
