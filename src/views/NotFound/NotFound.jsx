import React from "react";
import { Link } from "react-router-dom";
import Home from "../Home/Home.jsx";
import ContentMarginTop from '../../hoc/ContentMargin.jsx';

const NotFound = () => {
  return (
    <ContentMarginTop>
      <section>
        <h2 className="standard-margin-y text-center">
          This page does not exist
        </h2>
        <p className="text-center">
          <Link to={<Home />}>Back to start</Link>
        </p>
      </section>
    </ContentMarginTop>
  );
};

export default NotFound;
