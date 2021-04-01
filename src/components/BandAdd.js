import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

  const [name, setName] = useState('');
  const { socket } = useContext(SocketContext);

  const handleSubmit = e => {
    e.preventDefault();

    if (!name.trim()) return;

    socket.emit('create-band', { name });

    setName('');
  }

  return (
    <>
      <h3>Agregar Banda</h3>

      <form
        onSubmit={handleSubmit}
      >
        <input
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </form>
    </>
  )
}