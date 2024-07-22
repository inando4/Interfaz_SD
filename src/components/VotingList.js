import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './VotingList.css'; // Asegúrate de tener un archivo CSS para estilos personalizados

const VotingList = () => {
  const elections = [
    { id: 1, name: 'Elecciones Presidenciales' },
    { id: 2, name: 'Elecciones para Alcaldía' },
    { id: 3, name: 'Elecciones de Universidad' },
    { id: 4, name: 'Elecciones de Municipio' },
    { id: 5, name: 'Elecciones de Region Arequipa' },
    { id: 6, name: 'Elecciones de la UNSA' },
    // Agrega más elecciones según sea necesario
  ];

  return (
    <Container className="voting-list mt-4">
      <h1 className="text-center mb-4">Lista de Votaciones</h1>
      <Row>
        {elections.map((election, index) => (
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