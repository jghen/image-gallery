import "./Home.css";
import Footer from "../../components/Footer/Footer";
import ContentMargin from "../../hoc/ContentMargin";
import { useNavigate } from "react-router-dom";
import Container from "../../hoc/Container";
import { Blurhash } from "react-blurhash";
import { useState } from "react";

const Home = ({image}) => {
  
  //const
  const navigate = useNavigate();

  //state
  const [loaded, setLoaded] = useState(false);

  //events
  const imageLoaded = (e) => setLoaded(true);
  const goToImages = (e) => navigate("/Gallery/Images");

  //Custom components
  const loadedStyles = { display: loaded ? "block" : "none", };
  const SkeletonText = () => <div className="skeleton-home-text" style={{ display: loaded ? "none" : "block" }} ></div>;
  const BlurredHomeImage = () => {
    return (
      <div className="skeleton-home-img" style={{ display: loaded ? "none" : "block" }} >
        <Blurhash
          hash={image.blurHash}
          width={500}
          height={500}
          resolutionX={50}
          resolutionY={50}
          punch={1}
        />
      </div>
    );
  };

  return (
    <ContentMargin>
      {image && <Container>
        <section className="Home">
        <BlurredHomeImage/>
          <img
            style={loadedStyles}
            src={image.imageUrl}
            alt={image.title}
            className="home-img"
            id={image.id}
            onLoad={imageLoaded}
          />
          <div className="home-text">
          {loaded ? <h2 className="home-h2">Kunst - og flotte ting</h2>: <SkeletonText />}
          {loaded ? (
            <p>En samling nydelige verk. Denne siden har en backend for opplasting av bilder.</p>
            ) : <SkeletonText />}
          <button
            className="btn home-cta"
            onClick={goToImages}
          >
            <span>Se galleri</span>
            <span className="material-symbols-outlined">east</span>
          </button>
          </div>
        </section>
        <Footer />
      </Container>}
    </ContentMargin>
  );
};

export default Home;
