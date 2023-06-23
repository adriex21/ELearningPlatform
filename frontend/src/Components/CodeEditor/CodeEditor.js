import React, { useState, useEffect} from 'react';
import AceEditor from 'react-ace';
import brace from 'brace'
import axios from 'axios';
import 'brace/mode/c_cpp';
import 'brace/theme/dracula';
import 'brace/ext/language_tools.js';
import 'xterm/css/xterm.css';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import './CodeEditor.css'; // import the CSS file

function CodeEditor() {
  const [code, setCode] = useState('');
  const [term, setTerm] = useState(null);

  useEffect(() => {
    const defaultCode = 
`#include <iostream>
using namespace std;

int main() {

  cout << "Hello World!";
  return 0;
        
}`;

    setCode(defaultCode);

    const term = new Terminal({
      cursorBlink: true,
      scrollback: 1000,
    });
    term.open(document.getElementById('xterm-container'));
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();

    setTerm(term);

    // Clean up on unmount
    return () => {
      if (term) {
        term.dispose();
      }
    };
  }, []);

  const handleCodeChange = newCode => {
    setCode(newCode);
  };

  const handleRunCode = async () => {
    try {
      const encodedCode = btoa(code);
      console.log("Code:", code);
      const response = await axios.post(
        'http://localhost:3000/compile',
        { code: encodedCode },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      const output = response.data.output;
      console.log(output);
  
      if (term) {
        term.reset();
        term.write(output);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="code-editor-container h-full w-2/3 bg-white flex">
        <AceEditor
          style={{ height: "100%", width: "100%" }}
          mode="c_cpp"
          name="my-ace-editor"
          theme="dracula"
          value={code}
          onChange={handleCodeChange}
          fontSize={20}
          showPrintMargin={false}
          wrapEnabled={true}
          setOptions={{
            useWorker: false,
            vScrollBarAlwaysVisible:true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      <div className="w-1/2 flex flex-col bg-[#44475a]">
        <div className="p-5">
          <button className="run-button" onClick={handleRunCode}>
            Run Code
          </button>
        </div>
        <div id="xterm-container" className="xterm-container w-full h-full"></div>
      </div> 
    </div>
  );
}

export default CodeEditor;
