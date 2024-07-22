import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import './CandidateTemplates.css'; // Opcional: para estilos
import { elections } from './VotingList'; // Importa las elecciones

const candidates = [
  {
    id: 1,
    electionId: 1,
    name: 'Candidato 1',
    description: 'Descripción del Candidato 1',
    photo: '/mimujer.enc',
  },
  {
    id: 2,
    electionId: 1,
    name: 'Candidato 2',
    description: 'Descripción del Candidato 1',
    photo: '/mimujer.enc',
  },
  {
    id: 3,
    electionId: 1,
    name: 'Candidato 3',
    description: 'Descripción del Candidato 1',
    photo: '/mimujer.enc',
  },
  {
    id: 4,
    electionId: 1,
    name: 'Candidato 4',
    description: 'Descripción del Candidato 1',
    photo: '/mimujer.enc',
  },
  {
    id: 5,
    electionId: 2,
    name: 'Candidato 3',
    description: 'Descripción del Candidato 3',
    photo: 'url-de-la-foto-3',
  }
  // Agrega más candidatos según sea necesario
];

const CandidateTemplates = () => {
  const { electionId } = useParams();
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleSelect = (id) => {
    setSelectedCandidate(id);
  };

  const handleVote = () => {
    if (selectedCandidate !== null) {
      const candidate = candidates.find(candidate => candidate.id === selectedCandidate);
      alert(`Has votado por: ${candidate.name}`);
      // lógica para enviar el voto al servidor
    } else {
      alert('Por favor, selecciona un candidato antes de votar.');
    }
  };

  const filteredCandidates = candidates.filter(candidate => candidate.electionId === parseInt(electionId));
  const election = elections.find(election => election.id === parseInt(electionId));

  return (
    <Container className="candidate-templates">
      <br></br>
      <h1 className="text-center">{election ? election.name : 'Plantillas de Candidatos'}</h1>
      <br></br>
      <Row>
        {filteredCandidates.map(candidate => (
          <Col key={candidate.id} md={3} className="mb-4"> {/* Cambiado a 3 para 4 columnas por fila */}
            <Card className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''}`}>
              <Card.Img variant="top" src={candidate.photo} alt={candidate.name} className="candidate-photo" />
              <Card.Body>
                <Card.Title>{candidate.name}</Card.Title>
                <Button variant="primary" onClick={() => handleSelect(candidate.id)}>Marcar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="success" onClick={handleVote}>Votar</Button>
      </div>
    </Container>
  );
};

export default CandidateTemplates;