/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React from 'react';
import { createContext, useMemo, useContext } from 'react';
import io from 'socket.io-client';
import { server } from './constants/config';

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(server, { withCredentials: true }), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { SocketProvider, getSocket };
