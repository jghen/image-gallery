import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./views/Home/Home.jsx";
import About from "./views/About/About.jsx";
import Gallery from "./views/Gallery/Gallery.jsx";
import Contact from "./views/Contact/Contact.jsx";
import NotFound from "./views/NotFound/NotFound.jsx";
import Login from "./components/Login/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Gallery/*" element={<Gallery />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
