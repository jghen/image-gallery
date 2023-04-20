import "./Login.css";
import { API_BASE_URL } from "../const/urls";
import { useNavigate } from "react-router-dom";




const Login = () => {
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
  
    const { username, password } = document.forms[0];
    const url = API_BASE_URL + "/login";
    const options = {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username.value,
        password: password.value,
      }),
    };
    
    let data;
    try {
      const response = await fetch(url, options);
      data = await response.json();
      console.log('data:',data);
    } catch (error) {
      console.log(error.message)
      return error.message;
    }
    if (!data.status == "success") return;
    
    return navigate('/');
  };

  return (
    <form action="/login" method="post" onSubmit={loginUser}>
      <section className="Login">
        <label htmlFor="username">Brukernavn:</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Passord:</label>
        <input type="password" name="password" id="password" />
        <button className="btn cta-btn" type="submit">
          Logg inn
        </button>
      </section>
    </form>
  );
};

export default Login;
