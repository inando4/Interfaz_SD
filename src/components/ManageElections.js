import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const ManageElections = () => {
  const [elections, setElections] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setElections([...elections, { id: elections.length + 1, name: formData.name }]);
    handleClose();
  };

  return (
    <div>
      <h2>Gestionar Elecciones</h2>
      <Button variant="primary" onClick={handleShow}>Agregar Elección</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {elections.map(election => (
            <tr key={election.id}>
              <td>{election.id}</td>
              <td>{election.name}</td>
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
          <Modal.Title>Agregar Elección</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formElectionName">
              <Form.Label>Nombre de la Elección</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageElections;