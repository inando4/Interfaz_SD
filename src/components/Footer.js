import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-4">
      <div className="container text-center py-3">
        <p>&copy; {new Date().getFullYear()} Gestion de documentos. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;