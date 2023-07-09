import React, { useEffect, useState } from "react";
import { fetchCourses } from "../../action/content";
import "../../css/topics.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  gridCentering: {
    [theme.breakpoints.down("1280")]: {
      justifyContent: "center",
    },
  },
}));

const CourseList = (props) => {
  // console.log("Helllo from course list");
  const classes = useStyles();

  // var lang = props.match.params.lang;
  // var level = props.match.params.level;

  // if (lang === undefined) lang = "en";
  // if (level === undefined) level = 1;
  // if (lang === undefined) lang = "en";
  // if (level === undefined) level = 1;

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchCourses().then((res) => {
      console.log(res);
      setTopics(res);
    });
  }, []);

  return (
    <>
      <div className={"topics-container"}>
        <div className={"topics-title"}>My Courses</div>
        <Grid container spacing={2} className={classes.gridCentering}>
          {topics.map((course, i) => {
            return (
              <Grid item xs={12} >
                <div
                  className={"topic-container"}
                  onClick={() => {
                    props.history.push(
                      `/course/${course.course_id}`
                    );
                  }}
                >
                  <div className={"topic-top-container"}>
                    <div className={"topic-top-left"}>
                      <div className={"topic-serial"}>{course.code}</div>
                      <div className={"topic-title"}>{course.name}</div>
                    </div>
                    <div className={"topic-top-right"}>
                      {/* <img src={topic.logo} /> */}
                    </div>
                  </div>
                  <div className={"topic-divider"} />
                  <div className={"topic-bottom-container"}>
                    <div className={"topic-stats"}>
                      {/* {topic.nseries} Series */}
                      Course Teacher List
                      {/* {topic.nproblem} Problems */}
                    </div>
                    <div className={"topic-personal-stats"}>
                      {/* {topic.problem_solved}/{topic.nproblem} Problems */}
                      Course Teacher List
                    </div>
                  </div>
                  {/* <div
                    style={{
                      width: `${
                        (parseInt(topic.problem_solved) * 100) / topic.nproblem
                      }%`,
                      backgroundColor: topic.color,
                    }}
                    className={"topic-progress-bar"}
                  /> */}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
      {/* <TestList match={props.match} /> */}
    </>
  );
};

export default CourseList;
