import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1>Bienvenido al Sistema de Gestión de Documentos</h1>
      <Button variant="primary" size="lg" className="m-3" onClick={() => navigate('/public-documents')}>
        Documentos Públicos
      </Button>
      <Button variant="secondary" size="lg" className="m-3" onClick={() => navigate('/confidential-documents')}>
        Documentos Confidenciales
      </Button>
      <Button variant="danger" size="lg" className="m-3" onClick={() => navigate('/secret-documents')}>
        Documentos Secretos
      </Button>
    </div>
  );
};

export default HomePage;