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
      <Button 
        variant="primary" 
        size="lg" 
        className="m-3" 
        style={{ width: '200px', height: '400px' }} 
        onClick={() => navigate('/public-documents')}
      >
        <img src="/public-documents.png" alt="Documentos Públicos" style={{ width: '50px', height: '50px' }} />
        <div>Documentos Públicos</div>
      </Button>
      <Button 
        variant="secondary" 
        size="lg" 
        className="m-3" 
        style={{ width: '200px', height: '400px' }} 
        onClick={() => navigate('/confidential-documents')}
      >
        <img src="/confidential-documents.png" alt="Documentos Confidenciales" style={{ width: '50px', height: '50px' }} />
        <div>Documentos Confidenciales</div>
      </Button>
      <Button 
        variant="danger" 
        size="lg" 
        className="m-3" 
        style={{ width: '200px', height: '400px' }} 
        onClick={() => navigate('/secret-documents')}
      >
        <img src="/secret-documents.png" alt="Documentos Secretos" style={{ width: '50px', height: '50px' }} />
        <div>Documentos Secretos</div>
      </Button>
    </div>
  );
};

export default HomePage;