import React, {useEffect, useState} from 'react'
import { fetchSubmission} from "../../action/content";

import '../../css/problem-container.css'

import { verdicts } from '../../action/constants';

import CodeEditor from '../CodeEditor/Editor';

const SubmissionContainer=props=>{

    


    const submission_id = props.match.params.submission_id;



    
    const [submission,setSubmission]=useState(null);
    
   
    useEffect(()=>{
        fetchSubmission(submission_id).then(res=>{
            setSubmission(res)
            console.log("submission");
            console.log(res);
        })
    },[])

    const handleRefresh = () => {
        fetchSubmission(submission_id).then(res=>{
            setSubmission(res)
            console.log("submission");
            console.log(res);
        })
    }


    return(
        <div style={{padding:'20px'}}>
           
            {
                submission!==null ?(
                    <div>
                        <h2>Submission:{submission.submission_id}</h2>
                        <button className="btn btn-sm btn-primary" onClick={handleRefresh}>Refresh</button>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Problem</th>
                                    <th scope="col">Language</th>
                                    <th scope="col">Partial Verdict</th>
                                    <th scope="col">Final Verdict</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{submission.problem_id}</td>
                                    <td>{submission.language_id}</td>
                                    <td>{verdicts[submission.partial_verdict]}</td>
                                    <td>{verdicts[submission.final_verdict]}</td>
                                </tr>
                            </tbody>
                        </table>
                        <hr/>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Test </th>
                                    <th scope="col">Type </th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Memory</th>
                                    <th scope="col">Verdict</th>

                                </tr>
                            </thead>
                            <tbody>
                        {submission.verdicts.map((verdict,index)=>{
                            return(
                                   
                                <tr>
                                    <td>{verdict.serial}</td>
                                    <td>Pre test</td>
                                    <td>{verdict.runtime} ms</td>
                                    <td>{verdict.memory} byte</td>
                                    <td>{verdicts[verdict.result]}</td>

                                </tr>
                            )
                        })}
                        </tbody>
                                    </table>
                        <CodeEditor code={submission.code} language={submission.language} readOnly={true} />
                        
                        
                    </div>
                ):(
                    <div/>
                )

            }
             
        </div>
    )
}

export default SubmissionContainer;
