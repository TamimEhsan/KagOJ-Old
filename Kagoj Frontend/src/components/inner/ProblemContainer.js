import React, {useEffect, useState} from 'react'
import { fetchProblems,fetchSubmissions} from "../../action/content";

import '../../css/problem-container.css'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



import ProblemStatement from './ProblemStatement';
import CodeEditor from '../CodeEditor/Editor';
import ProblemSubmission from './ProblemSubmission';

const ProblemContainer=props=>{

    
    const serial=props.match.params.serial;

    const problem_id = props.match.params.problem_id;



    const [problem,setProblem]=useState(null);
    const [submissions,setSubmissions]=useState([]);

    useEffect(()=>{
        fetchProblems(problem_id).then(res=>{
            setProblem(res)
            console.log("problem");
            console.log(res);
        })
    },[])
    useEffect(()=>{
        fetchSubmissions(problem_id).then(res=>{
            setSubmissions(res)
            console.log("submissions");
            console.log(res);
        })
    },[])


    return(
        <div style={{padding:'20px'}}>
           
            {
                problem!==null ?(
                    <div>
                        <h2>{problem.name}</h2>
                        <span className={"badgeme"}>{problem.time_limit} ms </span>
                        <span className={"badgeme"}>{10} MB</span>
                        <Tabs
                            defaultActiveKey="statement"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            >
                            <Tab eventKey="statement" title="Statement">
                                <ProblemStatement history={props.history} problem={problem} />
                                <hr></hr>

                                <CodeEditor history={props.history} code={""}  problem_id={problem.problem_id}/>
                            </Tab>
                            <Tab eventKey="submission" title="Submission">
                                <ProblemSubmission history={props.history} submissions={submissions} problem={problem} serial={serial}/>
                            </Tab>
                            <Tab eventKey="tutorial" title="Tutorial" disabled>
                                Tab content for Contact
                            </Tab>
                            </Tabs>
                        
                    </div>
                ):(
                    <div/>
                )

            }
             
        </div>
    )
}

export default ProblemContainer
