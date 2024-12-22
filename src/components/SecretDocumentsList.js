import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import DocumentForm from './DocumentForm';

const SecretDocumentsList = () => {
  const [documents, setDocuments] = useState(() => {
    const savedDocuments = localStorage.getItem('secretDocuments');
    return savedDocuments ? JSON.parse(savedDocuments) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);

  useEffect(() => {
    localStorage.setItem('secretDocuments', JSON.stringify(documents));
  }, [documents]);

  const handleShowForm = (document = null) => {
    setCurrentDocument(document);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentDocument(null);
  };

  const handleSaveDocument = (document) => {
    const newDocument = {
      ...document,
      id: currentDocument ? currentDocument.id : documents.length + 1,
      fileUrl: document.file ? URL.createObjectURL(document.file) : currentDocument?.fileUrl
    };

    if (currentDocument) {
      setDocuments(documents.map(doc => doc.id === currentDocument.id ? newDocument : doc));
    } else {
      setDocuments([...documents, newDocument]);
    }
  };

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleDownloadFile = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <br></br>
      <h2 className="text-center">Documentos Secretos</h2>
      <Button variant="primary" onClick={() => handleShowForm()}>Agregar Documento</Button>
      <br></br>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.name}</td>
              <td>{doc.description}</td>
              <td>
                {doc.fileUrl && (
                  <Button variant="link" onClick={() => handleDownloadFile(doc.fileUrl, doc.name)}>
                    Descargar
                  </Button>
                )}
              </td>
              <td>
                <Button variant="warning" className="mr-2" onClick={() => handleShowForm(doc)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDeleteDocument(doc.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <DocumentForm show={showForm} handleClose={handleCloseForm} handleSave={handleSaveDocument} currentDocument={currentDocument} />
    </div>
  );
};

export default SecretDocumentsList;