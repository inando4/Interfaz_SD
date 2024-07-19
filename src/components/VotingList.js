import React from 'react';
import './VotingList.css'; // Opcional: para estilos

const VotingList = () => {
  const elections = [
    { id: 1, name: 'Elecciones Presidenciales' },
    { id: 2, name: 'Elecciones para Alcaldía' },
    { id: 3, name: 'Elecciones de Universidad' },
    // Agrega más elecciones según sea necesario
  ];

  return (
    <div className="voting-list">
      <h1>Lista de Votaciones</h1>
      <ul>
        {elections.map(election => (
          <li key={election.id}>
            <a href={`/election/${election.id}`}>{election.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotingList;