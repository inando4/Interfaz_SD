import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import ManageElections from './ManageElections';
import ManageCandidates from './ManageCandidates';
import ManageBallots from './ManageBallots';

const AdminDashboard = () => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/admin/elections">Gestionar Elecciones</Nav.Link>
            <Nav.Link as={Link} to="/admin/candidates">Gestionar Candidatos</Nav.Link>
            <Nav.Link as={Link} to="/admin/ballots">Gestionar Cartillas</Nav.Link>
          </Nav>
        </Col>
        <Col md={9}>
          <Routes>
            <Route path="elections" element={<ManageElections />} />
            <Route path="candidates" element={<ManageCandidates />} />
            <Route path="ballots" element={<ManageBallots />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;