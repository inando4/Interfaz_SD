import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import './CandidateTemplates.css'; // Opcional: para estilos

const candidates = [
  {
    id: 1,
    electionId: 1,
    name: 'Mi Abigail <3',
    description: 'Descripción del Candidato 1',
    photo: '/mimujer.enc',
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
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleSelect = (id) => {
    setSelectedCandidate(id);
  };

  const filteredCandidates = candidates.filter(candidate => candidate.electionId === parseInt(electionId));

  return (
    <Container className="candidate-templates">
      <h1>Plantillas de Candidatos</h1>
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
    </Container>
  );
};

export default CandidateTemplates;