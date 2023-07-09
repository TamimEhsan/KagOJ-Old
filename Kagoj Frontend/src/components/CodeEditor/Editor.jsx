import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';

import { submitSolution } from "../../action/content";

function CodeEditor(props) {
 
  const [code, setCode] = React.useState(props.code);
  const [submitted, setSubmitted] = React.useState(false);
  let readOnly = false;
  if( props.readOnly === true){
    readOnly = true;
  }
  const problem_id = props.problem_id;
  const handleSubmit = (code) => {
    // disable submit button
    if(submitted === true){
      return;
    }
    setSubmitted(true);
    document.getElementById("submit-btn").disabled = true;
    const submission = {
      problem_id: problem_id,
      code: code,
      language_id:2
    }
    const res =  submitSolution(submission);
   
    submitSolution(submission).then(res=>{
      props.history.push(`/submission/${res.submission_id}`);
    })
  }

  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);
  return (
    <div>
      <div className="p-3"  style={{
      backgroundColor: '#202836',
    }} >
      <CodeMirror
        
        value={code}
        height="500px"
        tabSize={8}
        
        extensions={[cpp()]}
        //   javascript({ jsx: true }), 
        onChange={onChange}
        theme={'dark'}
        readOnly={readOnly}
      />
     </div>
  
    
     { readOnly === false && 
      <div  className={"mt-1"} style={{
        backgroundColor: '#202836',
      }}>
        <button className={"btn btn-primary btn-sm m-3"} onClick={() => console.log('clicked')}>Run on Samples</button>
        <button id={"submit-btn"} className={"btn btn-success btn-sm "} onClick={() => handleSubmit(code)}>Submit</button> 
      </div>
    }
    
   </div>
  );
}
export default CodeEditor;