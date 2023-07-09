import React, {useEffect, useState} from 'react'
import '../../css/series.css'
import '../../css/topics.css'
import {fetchSerieses, fetchTopics} from "../../action/content";
import {Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({

    gridCentering: {

        [theme.breakpoints.down('1280')]: {
            justifyContent: 'center'
        }
    }
}));

const ProblemList=props=>{
    const classes = useStyles();
    console.log("in series list");
    const course_id=props.match.params.course_id;
    // const lang=props.match.params.lang;
    // const level=props.match.params.level;

    const [serieses,setSerieses]=useState([])

    useEffect(()=>{
        fetchSerieses(course_id).then(res=>{
            setSerieses(res)
            console.log(res)
        })
    },[])

    return(
        <div className={'topics-container'}>
            <div className={'topics-title'}>
                Problem
            </div>
            <Grid container spacing={2} className={classes.gridCentering}>
                {
                    serieses.map((problem,i)=>{
                        return(
                            <Grid item xs={12}  onClick={()=>{props.history.push(`/problem/${problem.problem_id}`)}}>
                                <div className={'series-container'}>
                                    <div className={'series-left-bar'}/>
                                    <div className={'series-body'}>
                                        <div className={'series-top-container'}>
                                            <div className={'series-top-left'}>
                                                {/* <div className={'topic-serial'}>
                                                    {'0'+(i+1)}
                                                </div> */}
                                                <div className={'topic-title'}>
                                                    {problem.name}
                                                </div>
                                            </div>
                                            <div className={'series-top-right'}>
                                               Solved
                                            </div>
                                        </div>
                                        <div className={'series-divider'}/>
                                        <div className={'series-bottom-container'}>
                                            Statistics
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

export default ProblemList
