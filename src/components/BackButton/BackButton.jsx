import "./BackButton.css";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="BackButton-Wrapper">
      <button className="BackButton" onClick={() => navigate(-1)}>❮</button>
    </div>
  );
};

export default BackButton;
