import React, { useEffect } from "react";
import { Socket } from "socket.io-client";

import { useAuthStore } from "@/hooks/store/use-auth-store";
import { createSocket } from "@/lib/socket";

interface ConnectionManagerProps {
  onMessageReceived: (data: { username: string; message: string }) => void;
  setSocket: (socket: Socket | null) => void;
  onConnectionStatusChange: (connected: boolean) => void;
}

const ConnectionManager: React.FC<ConnectionManagerProps> = ({
  onMessageReceived,
  setSocket,
  onConnectionStatusChange,
}) => {
  const token = useAuthStore((state) => state.user?.token);

  useEffect(() => {
    if (!token) return;

    
    const newSocket = createSocket(token);
    setSocket(newSocket);
    onConnectionStatusChange(true); 

   
    newSocket.on("message", (data) => {
      onMessageReceived(data);
    });

   
    return () => {
      newSocket.off("message");
      newSocket.close();
      onConnectionStatusChange(false); 
    };
  }, [token, onMessageReceived, setSocket, onConnectionStatusChange]);

  return null; 
};

export default ConnectionManager;
