import "./Login.css";

const Login = () => {
  return (
    <section className="Login">
      <label htmlFor="username">Brukernavn:</label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">Passord:</label>
      <input type="password" name="password" id="password" />
      <button className="btn cta-btn" type="submit">Logg inn</button>
    </section>
  );
};

export default Login;
