import React, { useState } from 'react';
import PingWindow from './components/PingWindow';

const App = () => {
  const [pings, setPings] = useState([
    { id: 1, text: "Hi there!", ts: new Date().toISOString(), fromMe: false },
    { id: 2, text: "Hey! How are you?", ts: new Date().toISOString(), fromMe: true },
    { id: 3, text: "All good, you?", ts: new Date().toISOString(), fromMe: false },
    { id: 4, text: "Doing great!", ts: new Date().toISOString(), fromMe: true },
    { id: 5, text: "Alright, Let's catch up later!", ts: new Date().toISOString(), fromMe: false },
  ]);

  const sendPing = async (userId, message) => {
    setPings(prev => [
      ...prev,
      {
        id: prev.length + 1,
        text: message,
        ts: new Date().toISOString(),
        fromMe: true
      }
    ]);
    try {
      const response = await fetch('http://acc-backend-service:3001/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, message })
      });

      const data = await response.json();
      console.log(data)

      if (data.ok) {
        setPings(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: data.message,
            ts: data.ts,
            fromMe: false
          }
        ]);
      } else {
        console.error('Ping failed:', data.error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ping Chat</h2>
      <PingWindow pings={pings} />
      <button
        onClick={() => sendPing('frontendUser', 'Hello from frontend!')}
        style={{ marginTop: '10px', padding: '8px 16px' }}
      >
        Send Ping to Backend
      </button>
    </div>
  );
};

export default App;
