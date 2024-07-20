import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import VotingList from './components/VotingList';
import CandidateTemplates from './components/CandidateTemplates';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from'react';

import Keycloak from 'keycloak-js';

const keycloakOptions = {
  url: 'http://localhost:8080',
  realm: 'reino-prueba',
  clientId: 'react-app-client',
}
function App() {
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    const initKeycloak = async () => {
      const keycloakInstance = new Keycloak(keycloakOptions);
      try {
        await keycloakInstance.init({ onLoad: 'login-required' });
        setKeycloak(keycloakInstance);
        if (keycloakInstance.authenticated) {
          console.log(keycloakInstance);
        }
      } catch (error) {
        console.log('Error ${error}');
      }
    }
    initKeycloak()
  }, [])

  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout();
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href='*'>React App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {keycloak && keycloak.authenticated ? (
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                </li>
              ): null}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        {keycloak && keycloak.authenticated ? (
          <div>
            <h2 className='text-center'>React App</h2>
            <AdminDashboard />
          </div>
        ) : (
          <div>
            <h2>Login</h2>
          </div>
        )}
      </div>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<VotingList />} />
            <Route path="/election/:electionId" element={<CandidateTemplates />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            {/* Aquí puedes agregar más rutas para otras páginas */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
