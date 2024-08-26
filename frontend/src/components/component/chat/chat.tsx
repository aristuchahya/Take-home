// import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useCallback, useState } from "react";
import ConnectionState from "./connection-state";
import ConnectionManager from "./connection-manager";
import Events from "./events";
import MyForm from "./my-form";
import { Socket } from "socket.io-client";
import { useAuthStore } from "@/hooks/store/use-auth-store";

export function MainChat() {
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const username = useAuthStore((state) => state.user?.username || "Anonymous");

  const handleMessageReceived = useCallback(
    (data: { username: string; message: string }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    },
    []
  );

  const handleSendMessage = useCallback(
    (message: string) => {
      if (socket && message.trim()) {
        socket.emit("newMessage", message);
      }
    },
    [socket]
  );

  const handleConnectionStatus = useCallback((connected: boolean) => {
    setIsConnected(connected);
  }, []);

  return (
    <div>
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager
        onMessageReceived={handleMessageReceived}
        setSocket={setSocket}
        onConnectionStatusChange={handleConnectionStatus}
      />
      <Events messages={messages} currentUsername={username} />
      <MyForm onSendMessage={handleSendMessage} />
    </div>
  );
}
