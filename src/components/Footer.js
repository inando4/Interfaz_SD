import React from 'react';
import './Footer.css'; // Asegúrate de crear un archivo CSS para estilos personalizados

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-4">
      <div className="container text-center py-3">
        <p>&copy; {new Date().getFullYear()} Sistema Electoral. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;