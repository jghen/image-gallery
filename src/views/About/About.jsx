import "./About.css";
import ContentMargin from '../../hoc/ContentMargin';
import Container from "../../hoc/Container";

const About = () => {
  return (
    <ContentMargin>
    <Container>
      <section className="About">
        <h2 className="About-h2 text-center">Om denne siden</h2>
        <p>Dette er et bildegalleri inkludert en backend for enkel opplasting og sletting av bilder. Bruker Amazon s3, sharp, blurhash, MySql og Sequelize.</p>
        <p>Galleriet var opprinnelig tenkt som nettside til en kunstner jeg kjenner, men lagde siden først i wordpress og så var den bra nok. Så dette er en enklere / mer generell versjon jeg lagde etterpå bare.</p>
      </section>
      </Container>
    </ContentMargin>
  );
};

export default About;
