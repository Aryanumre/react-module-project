import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to={"/"}>Home</Link>
      <br />
      <Link to={"/abouts-us"}>About</Link>
      <br />
      <Link to={"/service"}>Service</Link>
      <br />
      <Link to={"/contact-us"}>Contact</Link>
      <br />
    </div>
  );
};

export default Home;
