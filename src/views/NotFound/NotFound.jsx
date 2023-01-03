import React from "react";
import { Link } from "react-router-dom";
import Home from "../Home/Home.jsx";

const NotFound = () => {
  return (
    <section style={{marginTop: 'calc(var(--standard-margin) * 5)'}}>
      <h2 className="standard-margin-y text-center">This page does not exist</h2>
      <p className="text-center"><Link to={<Home/>}>Back to start</Link></p>
      
    </section>
  );
};

export default NotFound;