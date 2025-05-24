import React, { useEffect, useRef } from 'react';

const PingWindow = ({ pings }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [pings]);

  return (
    <div style={styles.container}>
      {pings.map(ping => (
        <div
          key={ping.id}
          style={{
            ...styles.messageRow,
            justifyContent: ping.fromMe ? 'flex-end' : 'flex-start'
          }}
        >
          <div
            style={{
              ...styles.bubble,
              backgroundColor: ping.fromMe ? '#dcf8c6' : '#f1f0f0',
              alignSelf: ping.fromMe ? 'flex-end' : 'flex-start'
            }}
          >
            <div>{ping.text}</div>
            <div style={styles.timestamp}>{new Date(ping.ts).toLocaleTimeString()}</div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

const styles = {
  container: {
    height: '300px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  messageRow: {
    display: 'flex',
    marginBottom: '10px',
  },
  bubble: {
    padding: '10px 14px',
    borderRadius: '16px',
    maxWidth: '70%',
    fontSize: '14px',
    lineHeight: '1.4',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  timestamp: {
    fontSize: '10px',
    textAlign: 'right',
    marginTop: '4px',
    color: '#666'
  }
};

export default PingWindow;
