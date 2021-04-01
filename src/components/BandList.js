import React, { useContext, useEffect, useState } from 'react'

import { SocketContext } from '../context/SocketContext';

export const BandList = () => {

  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('current-bands', (bands) => setBands(bands));
    return () => socket.off('current-bands');
  }, [socket]);

  const handleChangeName = (event, id) => {
    const name = event.target.value;
    setBands(bands => bands.map(band => band.id === id
      ? { ...band, name }
      : band));
  }

  const handleBlur = (id, newName) => socket.emit('change-name-band', { id, newName });

  const handleVoteBand = id => socket.emit('vote-band', id);

  const handleRemoveBand = id => socket.emit('remove-band', id);

  const createRows = () => {
    return (
      bands.map(({ name, votes, id }) => (
        <tr key={id}>
          <td>
            <button
              className="btn btn-outline-primary"
              onClick={() => handleVoteBand(id)}
            >
              +1
          </button>
          </td>
          <td>
            <input
              className="form-control"
              onChange={event => handleChangeName(event, id)}
              onBlur={() => handleBlur(id, name)}
              value={name}
            />
          </td>
          <td>
            <h3>{votes}</h3>
          </td>
          <td>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleRemoveBand(id)}
            >
              Borrar
          </button>
          </td>
        </tr>
      ))
    )
  }

  return (
    <>
      <table className="table table-stripped text-white">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {createRows()}
        </tbody>
      </table>
    </>
  )
}
