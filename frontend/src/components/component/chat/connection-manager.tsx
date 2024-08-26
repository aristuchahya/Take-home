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

    // Buat koneksi socket
    const newSocket = createSocket(token);
    setSocket(newSocket);
    onConnectionStatusChange(true); // Set status koneksi

    // Menangani event socket
    newSocket.on("message", (data) => {
      onMessageReceived(data);
    });

    // Pembersihan koneksi
    return () => {
      newSocket.off("message");
      newSocket.close();
      onConnectionStatusChange(false); // Set status koneksi
    };
  }, [token, onMessageReceived, setSocket, onConnectionStatusChange]);

  return null; // Tidak perlu render apa-apa
};

export default ConnectionManager;
