import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./views/Home/Home.jsx";
import About from "./views/About/About.jsx";
import Gallery from "./views/Gallery/Gallery.jsx";
import Contact from "./views/Contact/Contact.jsx";
import NotFound from "./views/NotFound/NotFound.jsx";
import Login from "./components/Login/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer"
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { setAllImages, selectImages } from "./components/Images/imagesSlice.jsx";
import { selectIsSignedIn } from "./state/authSlice";
import { storageSave } from "./storage/storage.jsx";
import { STORAGE_KEY_IMAGES } from "./const/storageKeys.jsx";
import { fetchInitialImages } from "./api/imagesFetch.jsx";
import ImageLoader from "./components/ImageLoader/ImageLoader";

function App() {

  const images = useSelector(selectImages);
  // const loggedIn = useSelector(selectIsSignedIn);
  const dispatch = useDispatch();

  // state local
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);


  // side effects
  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    let initialData;
    try {
      initialData = await fetchInitialImages();
      setCoverImage(initialData[0])
      dispatch(setAllImages(initialData));
      storageSave(STORAGE_KEY_IMAGES, initialData);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      dispatch(setAllImages(null));
      storageSave(STORAGE_KEY_IMAGES, null);
    }
  },[]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);
  
  return (
    <BrowserRouter>
      <Navbar />
     {loading ? (
        <div className="images-loader-wrapper">
          <ImageLoader />
        </div>
      ) : (
        <>
        <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home image={coverImage}/>} />
        <Route path="/About" element={<About />} />
        <Route path="/Gallery/*" element={<Gallery />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        </Routes>
        <Footer/>
        </>
      )}
      
    </BrowserRouter>
  );
}

export default App;
