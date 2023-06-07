import "./Home.css";
import Footer from "../../components/Footer/Footer";
import ContentMargin from "../../hoc/ContentMargin";
import { useNavigate } from "react-router-dom";
import Container from "../../hoc/Container";
import frog from '../../assets/green_frog.jpg'

const Home = () => {
  const goToImages = () => {
    return navigate("/Gallery/Images");
  }
  const navigate = useNavigate();
  return (
    <ContentMargin>
      <Container>
        <section className="Home">
          <img className="home-img" src={frog} alt="green frog" />
          <h2 className="home-h2">Kunst - og flotte ting</h2>
          <p className="home-text">
            En samling nydelige verk. Denne siden har en backend for opplasting
            av bilder.{" "}
          </p>
          <button
            className="btn home-cta"
            onClick={goToImages}
          >
            <span>Se galleri</span>
            <span className="material-symbols-outlined">east</span>
          </button>
        </section>
        <Footer />
      </Container>
    </ContentMargin>
  );
};

export default Home;
