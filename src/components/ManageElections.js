import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { elections as electionsData } from './VotingList'; // Importa los datos de VotingList
import { Pie } from 'react-chartjs-2'; // Asegúrate de instalar react-chartjs-2 y chart.js
import { Chart, ArcElement } from 'chart.js'; // Importa Chart y ArcElement
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importa el plugin

// Registra ArcElement y ChartDataLabels
Chart.register(ArcElement, ChartDataLabels);

const ManageElections = () => {
  const [elections, setElections] = useState(electionsData); // Inicializa con los datos importados
  const [show, setShow] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [selectedElection, setSelectedElection] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleResultsClose = () => setShowResults(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setElections([...elections, { id: elections.length + 1, name: formData.name }]);
    handleClose();
  };

  const handleShowResults = (election) => {
    setSelectedElection(election);
    setShowResults(true);
  };

  const data = {
    labels: ['Candidato 1', 'Candidato 2', 'Candidato 3'], // Nombres de los candidatos
    datasets: [
      {
        data: [10, 20, 30], // Cantidad de votos por cada candidato
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  const winnerIndex = data.datasets[0].data.indexOf(Math.max(...data.datasets[0].data));
  const winner = data.labels[winnerIndex];

  return (
    <div>
      <br></br>
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
                <Button variant="warning" className="mr-2" style={{ marginRight: '10px' }}>Editar</Button>
                <Button variant="danger" className="mr-2" style={{ marginRight: '10px' }}>Eliminar</Button>
                <Button variant="info" onClick={() => handleShowResults(election)}>Resultados</Button>
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

      <Modal show={showResults} onHide={handleResultsClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resultados de {selectedElection?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ marginRight: '20px' }}>
              <h5>Leyenda:</h5>
              <ul>
                {data.labels.map((label, index) => (
                  <li key={index} style={{ color: data.datasets[0].backgroundColor[index] }}>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <Pie 
                data={data} 
                options={{
                  plugins: {
                    datalabels: {
                      formatter: (value, context) => {
                        return value;
                      },
                      color: '#fff',
                      font: {
                        weight: 'bold'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <h5>Ganador: {winner}</h5>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageElections;