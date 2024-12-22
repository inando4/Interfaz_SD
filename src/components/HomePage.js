import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const HomePage = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  // Obtén el nombre completo del usuario autenticado
  const userName = keycloak.authenticated 
    ? `${keycloak.tokenParsed?.given_name || ''} ${keycloak.tokenParsed?.family_name || ''}`.trim()
    : 'Invitado';

  return (
    <div className="text-center">
      <br className='text-left'></br>
      <h1>Bienvenido, {userName}, al Sistema de Gestión de Documentos</h1>
      <br></br>
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