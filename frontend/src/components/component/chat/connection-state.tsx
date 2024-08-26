import React from "react";

interface ConnectionStateProps {
  isConnected: boolean;
}

const ConnectionState: React.FC<ConnectionStateProps> = ({ isConnected }) => {
  return (
    <div>
      {isConnected ? (
        <p>Connected to chat server</p>
      ) : (
        <p>Disconnected from chat server</p>
      )}
    </div>
  );
};

export default ConnectionState;
