import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./views/Home/Home.jsx";
import Blog from './views/Blog/Blog.jsx';
import Gallery from "./views/Gallery/Gallery.jsx";
import Contact from "./views/Contact/Contact.jsx";
import NotFound from "./views/NotFound/NotFound.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector} from "react-redux";
import { selectIsSignedIn } from "../app/isSignedInSlice";



function App() {
  const loggedIn = useSelector(selectIsSignedIn);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Gallery/*" element={<Gallery />}/>
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
