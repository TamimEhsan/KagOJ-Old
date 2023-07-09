import React from "react";
import "../../css/left-pan.css";
import logo from "../../assets/icons/logo.svg";
import sort from "../../assets/sort.png";
import problem_logo from "../../assets/problem-logo-dummy.png";
import fire_icon from "../../assets/fire-icon.png";
import search_icon from "../../assets/search-icon.png";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./ProblemCard.scss";

const CourseCard = ({ course }) => {
  course = {"code": "CSE 101", "name": "Introduction to Programming", "course_id": 1}
  const history = useHistory();
  // console.log(problem);
  return (
    <Grid item xs={10} lg={6}>
      <div
        onClick={() => {
          history.push(
            `/course/${course.course_id}`
          );
        }}
        className={"problem-card"}
      >
        <div className={"top-container"}>
          <div className={"top-left"}>
            {/* <div className={"problem-serial"}>{serial + 1}</div> */}
            {/* <div className={"problem-title"}>{problem.problem_title}</div> */}
          </div>
          <div className={"top-right"}>
            {/* <img src={problem.logo} /> */}
          </div>
        </div>
        <div className={"topic-divider"} />
        <div className={"left-problem-card-bottom-container"}>
          <div className={"left-problem-card-description"}>
            {course.name} {">"} {course.code} 
          </div>
          <div className={"left-problem-card-bottom"}>
            <div className={"left-problem-card-bottom-icon"}>
              <img src={fire_icon} />
            </div>
            <div className={"left-problem-card-bottom-level"}>
              Level 5
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default CourseCard;
