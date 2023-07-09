import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
  } from "react";
  import "../../css/problem.css";
  
  import {Grid} from "@material-ui/core";
  import { MathJax, MathJaxContext } from "better-react-mathjax";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { verdicts } from "../../action/constants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

  const ProblemSubmission = (props) => {
  
    
    const submissions = props.submissions;
    const problem = props.problem;

    console.log("in problem submission");
    console.log(submissions);
    // return (
    //   <div>
    //     <h2>Submissions</h2>
    //     {submissions.map((submission, i) => {
    //         return (
    //           <Grid item xs={12} >
    //             <div
    //               className={"topic-container"}
    //               onClick={() => {
    //                 props.history.push(
    //                   `/course/${submission.submission_id}`
    //                 );
    //               }}
    //             >
    //               <div className={"topic-top-container"}>
                    
    //                   <div className={""}>{submission.submission_id}</div>
    //                   <div className={"topic-title"}>{submission.problem_id}</div>
                    
                    
    //               </div>
                  
    //             </div>
    //           </Grid>
    //         );
    //       })}
    //   </div>
    // );

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Submission ID </StyledTableCell>
               <StyledTableCell align="right">Problem Name</StyledTableCell>
                <StyledTableCell align="right">Partial Verdict</StyledTableCell>
                <StyledTableCell align="right">Final Verdict</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => (
                <StyledTableRow key={submission.submission_id}>
                  <StyledTableCell component="th" scope="row"  onClick={() => {
                    props.history.push(
                      `/submission/${submission.submission_id}`
                    );
                  }} >
                  {submission.submission_id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{problem.name}</StyledTableCell>
                  <StyledTableCell align="right">{verdicts[submission.partial_verdict]}</StyledTableCell>
                  <StyledTableCell align="right">{verdicts[submission.final_verdict]}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

  };
  
  export default ProblemSubmission;
  