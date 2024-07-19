import React from 'react';
import { useParams } from 'react-router-dom';
import './CandidateTemplates.css'; // Opcional: para estilos

const candidates = [
  {
    id: 1,
    electionId: 1,
    name: 'Candidato 1',
    description: 'Descripción del Candidato 1',
    photo: 'url-de-la-foto-1',
  },
  {
    id: 2,
    electionId: 1,
    name: 'Candidato 2',
    description: 'Descripción del Candidato 2',
    photo: 'url-de-la-foto-2',
  },
  {
    id: 3,
    electionId: 2,
    name: 'Candidato 3',
    description: 'Descripción del Candidato 3',
    photo: 'url-de-la-foto-3',
  },
  // Agrega más candidatos según sea necesario
];

const CandidateTemplates = () => {
  const { electionId } = useParams();
  const filteredCandidates = candidates.filter(candidate => candidate.electionId === parseInt(electionId));

  return (
    <div className="candidate-templates">
      <h1>Plantillas de Candidatos</h1>
      <ul>
        {filteredCandidates.map(candidate => (
          <li key={candidate.id} className="candidate-card">
            <img src={candidate.photo} alt={candidate.name} className="candidate-photo" />
            <h2>{candidate.name}</h2>
            <p>{candidate.description}</p>
            <button>Votar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateTemplates;