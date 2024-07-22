import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', photo: '' });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCandidates([...candidates, { id: candidates.length + 1, ...formData }]);
    handleClose();
  };

  return (
    <div>
      <br></br>
      <h2>Gestionar Candidatos</h2>
      <Button variant="primary" onClick={handleShow}>Agregar Candidato</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.name}</td>
              <td>{candidate.description}</td>
              <td><img src={candidate.photo} alt={candidate.name} style={{ width: '50px' }} /></td>
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
          <Modal.Title>Agregar Candidato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCandidateName">
              <Form.Label>Nombre del Candidato</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formCandidateDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formCandidatePhoto">
              <Form.Label>URL de la Foto</Form.Label>
              <Form.Control type="text" name="photo" value={formData.photo} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageCandidates;