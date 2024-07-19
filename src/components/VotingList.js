import React from 'react';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';
import './VotingList.css'; // Opcional: para estilos

const VotingList = () => {
  const elections = [
    { id: 1, name: 'Elecciones Presidenciales' },
    { id: 2, name: 'Elecciones para Alcaldía' },
    { id: 3, name: 'Elecciones de Universidad' },
    // Agrega más elecciones según sea necesario
  ];

  return (
    <Container className="voting-list">
      <Row>
        <Col>
          <h1>Lista de Votaciones</h1>
          <ListGroup>
            {elections.map(election => (
              <ListGroup.Item key={election.id} action href={`/election/${election.id}`}>
                {election.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default VotingList;