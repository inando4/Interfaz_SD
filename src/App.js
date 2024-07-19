import React from 'react';
import VotingList from './components/VotingList';
import CandidateTemplates from './components/CandidateTemplates';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<VotingList />} />
          <Route path="/election/:electionId" element={<CandidateTemplates />} />
          {/* Aquí puedes agregar más rutas para otras páginas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
