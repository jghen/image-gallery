import "./Container.css";

const Container = ({children}) => {
  return (
    <div className="std-container">
      {children}
    </div>
  );
};

export default Container;