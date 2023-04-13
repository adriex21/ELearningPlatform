import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

function XtermTerminal() {
  const terminalRef = useRef(null);

  useEffect(() => {
    const terminal = new Terminal();
    terminal.open(terminalRef.current);
    
    const socket = new WebSocket('ws://localhost:3000/terminal');
    socket.onopen = () => {
      terminal.writeln('Connection established.');
    };
    
    socket.onmessage = event => {
      terminal.write(event.data);
    };
    
    terminal.onData(data => {
      socket.send(data);
    });
    
    return () => {
      socket.close();
      terminal.dispose();
    };
  }, []);

  return (
    <div ref={terminalRef} style={{ height: '100%' }} />
  );
}

export default XtermTerminal;