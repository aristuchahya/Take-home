import React, { useState, ChangeEvent, FormEvent } from "react";

interface MyFormProps {
  onSendMessage: (message: string) => void;
}

const MyForm: React.FC<MyFormProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type a message"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MyForm;
