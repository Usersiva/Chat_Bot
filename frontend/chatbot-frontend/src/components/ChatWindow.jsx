import { useState } from "react";
import axios from "axios";
import Message from "./Message";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // add user message
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input
      });

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: res.data.reply }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Mock AI service unavailable" }
      ]);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            text={msg.text}
          />
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          placeholder="Ask something..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
