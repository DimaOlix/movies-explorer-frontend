import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({ children }) {
  
  return (
    <section className="header">
      <Link className="header__logo" to="/" />

      { children }

    </section>
  )
}

export default Header;