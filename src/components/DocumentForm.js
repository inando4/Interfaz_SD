import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const DocumentForm = ({ show, handleClose, handleSave, currentDocument }) => {
  const [formData, setFormData] = useState({ name: '', description: '', file: null });

  useEffect(() => {
    if (currentDocument) {
      setFormData(currentDocument);
    } else {
      setFormData({ name: '', description: '', file: null });
    }
  }, [currentDocument]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentDocument ? 'Editar Documento' : 'Agregar Documento'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDocumentName">
            <Form.Label>Nombre del Documento</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formDocumentDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formDocumentFile">
            <Form.Label>Archivo</Form.Label>
            <Form.Control type="file" name="file" onChange={handleChange} />
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit">Guardar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DocumentForm;