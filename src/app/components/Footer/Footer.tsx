import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Recipe App. All Rights Reserved.</p>
        <p>Created by [Anil kumar swain]</p>
        <p>
          A simple and user-friendly application to explore and share delicious recipes.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
