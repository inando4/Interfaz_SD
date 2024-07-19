import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
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
    <Container className="candidate-templates">
      <h1>Plantillas de Candidatos</h1>
      <Row>
        {filteredCandidates.map(candidate => (
          <Col key={candidate.id} md={4} className="mb-4">
            <Card className="candidate-card">
              <Card.Img variant="top" src={candidate.photo} alt={candidate.name} className="candidate-photo" />
              <Card.Body>
                <Card.Title>{candidate.name}</Card.Title>
                <Card.Text>{candidate.description}</Card.Text>
                <Button variant="primary">Votar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CandidateTemplates;