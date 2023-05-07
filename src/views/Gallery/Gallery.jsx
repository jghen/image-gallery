import "./Gallery.css";
import Images from "../../components/Images/Images.jsx";
import Textiles from "../Textiles/Textiles.jsx";
import Other from "../Other/Other.jsx";
import CardPage from "../../components/CardPage/CardPage";
import SubNavbar from "../../components/SubNavbar/SubNavbar.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ContentMarginTop from "../../hoc/ContentMarginTop";

const Gallery = () => {
  // const navigate = useNavigate();

  // useEffect(()=>{
  //   navigate('/Gallery/Images');
  // }, [])

  return (
    <ContentMarginTop>
      <section className="Gallery">
        <SubNavbar />
        <Routes>
          <Route path="" index element={<Images />} />
          <Route path="Images" element={<Images />}/>
          <Route path="Images/:imageId" element={<CardPage />} />
          <Route path="Textiles" element={<Textiles />} />
          <Route path="Other" element={<Other />} />
        </Routes>
      </section>
    </ContentMarginTop>
  );
};

export default Gallery;
