import { useMemo, useEffect, useState } from 'react';
import io from "socket.io-client";

export const useSocket = (serverPath) => {

  // Connection to socket server
  const socket = useMemo(() => io.connect(serverPath, { transports: ['websocket'] }), [serverPath]);
  const [online, setOnline] = useState(false);

  // Establecemos cuando nos conectamos
  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  // Escuchamos cuando nos reconectamos
  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  // Escuchamos cuando nos desconectamos
  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online
  }

}