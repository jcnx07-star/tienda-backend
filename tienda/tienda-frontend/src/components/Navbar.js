import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <h1 className="navbar-title">🛍️ Tienda Virtual</h1>
        <ul className="navbar-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/usuarios">Usuarios</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
