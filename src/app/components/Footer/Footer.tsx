import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" tabIndex={0}>
      <div className="container" tabIndex={0}>
        <p tabIndex={0}>
          &copy; {new Date().getFullYear()} Recipe App. All Rights Reserved.
        </p>
        <p tabIndex={0}>Created by [Anil kumar swain]</p>
        <p tabIndex={0}>
          A simple and user-friendly application to explore and share delicious
          recipes.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
