import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Importa el archivo CSS personalizado
import VotingList from './components/VotingList';
import CandidateTemplates from './components/CandidateTemplates';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer'; // Importa el componente Footer
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const App = () => {
  const { keycloak, initialized } = useKeycloak();
  const initialTimeLeft = parseInt(localStorage.getItem('timeLeft')) || 300; // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    if (timeLeft === 0) {
      handleLogout();
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = prevTimeLeft - 1;
        localStorage.setItem('timeLeft', newTimeLeft);
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleLogout = () => {
    keycloak.logout();
    localStorage.removeItem('timeLeft'); // Limpiar el tiempo restante al cerrar sesión
  };

  if (!initialized) {
    return <div>Loading...</div>;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const userName = `${keycloak.tokenParsed?.given_name || 'Usuario'} ${keycloak.tokenParsed?.family_name || ''}`;

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Sistema Electoral</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {keycloak.authenticated ? (
                  <li className="nav-item d-flex align-items-center">
                    <span className="navbar-text me-3" style={{ color: 'white' }}>{formatTime(timeLeft)}</span>
                    <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="App">
        <Routes>
          <Route exact path="/" element={<VotingList userName={keycloak.authenticated ? userName : null} />} />
          <Route path="/election/:electionId" element={<CandidateTemplates />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                redirectPath="/"
                isAllowed={keycloak.authenticated && keycloak.hasRealmRole('Administrador')}
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer /> {/* Añade el componente Footer aquí */}
    </Router>
  );
};

export default App;