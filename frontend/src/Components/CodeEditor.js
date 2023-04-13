import React, { useState } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace'
import axios from 'axios';
import 'brace/mode/javascript'
import 'brace/theme/cobalt'
function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCodeChange = newCode => {
    setCode(newCode);
  };

 
  return (
    <>
      <AceEditor
        mode="javascript"
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
        commands={[
          {
            name: 'runCode',
            bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
            exec: editor => {
              
            },
          },
        ]}
      />
      <div>Output:</div>
      <div>{output}</div>
    </>
  );
}

export default CodeEditor;