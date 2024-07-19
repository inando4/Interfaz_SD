import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const ManageBallots = () => {
  const [ballots, setBallots] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBallots([...ballots, { id: ballots.length + 1, name: formData.name }]);
    handleClose();
  };

  return (
    <div>
      <h2>Gestionar Cartillas</h2>
      <Button variant="primary" onClick={handleShow}>Agregar Cartilla</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ballots.map(ballot => (
            <tr key={ballot.id}>
              <td>{ballot.id}</td>
              <td>{ballot.name}</td>
              <td>
                <Button variant="warning" className="mr-2">Editar</Button>
                <Button variant="danger">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Cartilla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBallotName">
              <Form.Label>Nombre de la Cartilla</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageBallots;