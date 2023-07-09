import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "../../css/problem.css";


import { MathJax, MathJaxContext } from "better-react-mathjax";

const ProblemStatement = (props) => {


  const problem = props.problem;

  return (
    <div>
      <h2>Statement</h2>
      {problem.statement}
      <h2>Input</h2>
      {problem.input}

      <h2>Output</h2>
      {problem.output}
    </div>
  );
};

export default ProblemStatement;
