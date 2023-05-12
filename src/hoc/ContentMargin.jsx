import "./ContentMargin.css";

const ContentMargin = ({children}) => {
  return (
    <div className="Content-margin-wrapper">
      {children}
    </div>
  );
};

export default ContentMargin;