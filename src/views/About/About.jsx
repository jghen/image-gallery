import "./About.css";
import ContentMargin from '../../hoc/ContentMargin';

const About = () => {
  return (
    <ContentMargin>
      <section className="About">
        <h2 className="About-h2 text-center">Om denne siden</h2>
        <p>Dette er et bildegaller med en backend for enkel opplasting og sletting av bilder. Det var opprinnelig tenkt en veninne av meg, men lagde siden først i wordpress og så var den bra nok. Så dette er en enklere versjon bare, uten kontaktskjema.</p>
      </section>
    </ContentMargin>
  );
};

export default About;
