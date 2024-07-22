import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Asegúrate de instalar react-icons
import './VotingList.css'; // Asegúrate de tener un archivo CSS para estilos personalizados

const VotingList = ({ userName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const elections = [
    { id: 1, name: 'Elecciones Presidenciales' },
    { id: 2, name: 'Elecciones para Alcaldía' },
    { id: 3, name: 'Elecciones de Universidad' },
    { id: 4, name: 'Elecciones de Municipio' },
    { id: 5, name: 'Elecciones de Region Arequipa' },
    { id: 6, name: 'Elecciones de la UNSA' },
    // Agrega más elecciones según sea necesario
  ];

  const filteredElections = elections.filter(election =>
    election.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="voting-list mt-4">
      <h1 className="text-center mb-4">Lista de Elecciones</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        {userName && <h5 className="mt-3">Bienvenido, {userName}</h5>}
        <InputGroup className="search-bar">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Buscar elecciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>
      <Row>
        {filteredElections.map((election, index) => (
          <Col key={election.id} md={6} className="mb-4 d-flex justify-content-center">
            <Card className="w-100"> {/* Ajusta el ancho de la tarjeta aquí */}
              <Card.Body className="d-flex justify-content-between align-items-center">
                <Card.Title>{election.name}</Card.Title>
                <Button variant="primary" href={`/election/${election.id}`}>Ver Detalles</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VotingList;