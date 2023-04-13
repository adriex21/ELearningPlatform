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
      console.log("Code:", code);
      const response = await axios.post('http://localhost:3000/compile',  { code },{ 
        headers: {
        'Content-Type': 'application/json'
      }});
      const { output } = response.data;
      setOutput(output); 
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
      <div>{output}</div>
    </>
  );
}

export default CodeEditor;