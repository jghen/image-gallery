import "./Home.css";
import Footer from "../../components/Footer/Footer"; 
import ContentMarginTop from '../../hoc/ContentMargin';

const Home = () => {
  return (
    <ContentMarginTop>
      <section className="Home">
        <h2 className="home-h2 text-center">Hjem</h2>
      </section>
      <Footer />
    </ContentMarginTop>
  );
};

export default Home;
