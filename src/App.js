import 'bootstrap/dist/css/bootstrap.min.css';
import VotingList from './components/VotingList';
import CandidateTemplates from './components/CandidateTemplates';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const App = () => {
  const { keycloak, initialized } = useKeycloak();

  const handleLogout = () => {
    keycloak.logout();
  };

  if (!initialized) {
    return <div>Loading...</div>;
  }

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
                  <li className="nav-item">
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
          <Route exact path="/" element={<VotingList />} />
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
    </Router>
  );
};

export default App;