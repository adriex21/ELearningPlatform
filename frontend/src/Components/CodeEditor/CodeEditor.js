import React, { useState, useEffect} from 'react';
import AceEditor from 'react-ace';
import axios from 'axios';
import 'brace/mode/c_cpp';
import 'brace/theme/dracula';
import 'brace/ext/language_tools.js';
import 'xterm/css/xterm.css';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import './CodeEditor.css'; // import the CSS file

function CodeEditor(props) {
  const { code, setCode } = props;
  const [ output, setOutput ] = useState('');
  const [term, setTerm] = useState(null);


  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,

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
      setOutput(output);
      if (term) {
        term.reset();
        term.write(output);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="flex flex-col h-full w-1/2 bg-white flex overflow-hidden">
          <AceEditor
            style={{width:'100%', height: '100%'}}
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
        <div className="flex flex-col bg-[#44475a] h-1/3 w-full">
          <div className="p-5">
            <button className="run-button" onClick={handleRunCode}>
              Run Code
            </button>
          </div>
          <div id="xterm-container" className=" h-full outline-none text-white"></div>
        </div> 

        
    </div>
  );
}

CodeEditor.defaultProps = {
 code: '',
 setCode: () => null,
}

export default CodeEditor;
