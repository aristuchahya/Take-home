import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Ganti dengan URL server WebSocket Anda

// Fungsi untuk membuat koneksi socket
export const createSocket = (token: string | null): Socket => {
  return io(SOCKET_URL, {
    auth: {
      token: `Bearer ${token}`,
    },
  });
};
