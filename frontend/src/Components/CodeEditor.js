import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace'
import axios from 'axios';
import 'brace/mode/c_cpp';
import 'brace/theme/cobalt';
import 'brace/ext/language_tools';

function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCodeChange =  newCode => {
     setCode(newCode);
  };

  const handleRunCode = async () => {
    try {
      const encodedCode = btoa(code)
      console.log("Code:", code);
      const response = await axios.post('http://localhost:3000/compile',  { code:encodedCode },{ 
        headers: {
        'Content-Type': 'application/json'
      }});
      
      setOutput(response.data.output); 
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AceEditor
        mode="c_cpp"
        name="my-ace-editor"
        theme="cobalt"
        value={code}
        onChange={handleCodeChange}
        fontSize={14}
        showPrintMargin={false}
        wrapEnabled={true}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <button onClick={handleRunCode}>Run Code</button>
      <div>Output:</div>
      <div style={{"whiteSpace": "preLine"}}>{output}</div>
    </>
  );
}

export default CodeEditor;