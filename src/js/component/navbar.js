import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            Lista de Contactos usando React & Context
          </span>
        </Link>
      </div>
    </nav>
  );
};
