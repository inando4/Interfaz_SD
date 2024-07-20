import 'bootstrap/dist/css/bootstrap.min.css';
import VotingList from './components/VotingList';
import CandidateTemplates from './components/CandidateTemplates';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Keycloak from 'keycloak-js';


const keycloakOptions = {
  url: "http://localhost:8080/",
  realm: "reino-prueba",
  clientId: "react-app-client",
};

const kc = new Keycloak(keycloakOptions);

kc.init({
  onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
  checkLoginIframe: true,
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    /* Remove below logs if you are using this on production */
    console.info("Authenticated");
    console.log('auth', auth)
    console.log('Keycloak', kc)
    console.log('Access Token', kc.token)
    console.log(kc)
    const nombreUsuario = kc.tokenParsed.name;
    console.log('Nombre Usuario:', nombreUsuario)
    kc.onTokenExpired = () => {
      console.log('token expired')
    }
  }
}, () => {
  /* Notify the user if necessary */
  console.error("Authentication Failed");
});

const handleLogout = () => {
  if (kc) {
    kc.logout();
  }
}

const getNombreUsuario = () => {
  if (kc && kc.tokenParsed) {
    return kc.tokenParsed.name;
  }
  return ''; // Retorna una cadena vacía o un valor predeterminado si kc o kc.tokenParsed no están definidos
};

function App() {
  const nombreUsuario = getNombreUsuario(); // Paso 1 y 2
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
                {true ? (
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </nav>
        <div>
          <h2>Bienvenido: {nombreUsuario}</h2>
        </div>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<VotingList />} />
            <Route path="/election/:electionId" element={<CandidateTemplates />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            {/* Aquí puedes agregar más rutas para otras páginas */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;