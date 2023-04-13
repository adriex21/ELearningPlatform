import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace'
import axios from 'axios';
import 'brace/mode/c_cpp';
import 'brace/theme/dracula';
import 'brace/ext/language_tools';
import './CodeEditor.css'; // import the CSS file

function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

useEffect(() => {
    const defaultCode = `// Your First C++ Program
#include <iostream>

int main() {
  
    std::cout << "Hello World!";
    return 0;
}`;

    setCode(defaultCode);
  }, []);

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
    <div className="code-editor-container">
      <div className="code-editor-wrapper">
        <AceEditor
          style={{ height: "100%", width:"100%" }}
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
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
      <div className="output-container">
        <button className="run-button" onClick={handleRunCode}>Run Code</button>
        <div className="output-box" dangerouslySetInnerHTML={{ __html: output }}></div>
      </div>
    </div>
  );
}

export default CodeEditor;