import "./ContentMarginTop.css";

const ContentMarginTop = ({children}) => {
  return (
    <div className="Content-margin-wrapper">
      {children}
    </div>
  );
};

export default ContentMarginTop;