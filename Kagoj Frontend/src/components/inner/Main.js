import React, { useEffect, useState } from "react";
import "../../css/main.css";

// import RightPan from "./RightPan";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CourseList from "./CourseList";
import ProblemList from "./ProblemList";
import ProblemContainer from "./ProblemContainer";
import { fetchProfile } from "../../action/profile";
import { useSelector, useDispatch } from "react-redux";


import SubmissionContainer from "./Submission";

const Main = (props) => {
  console.log("main");
  const profile = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const [history, setHistory] = useState(props.history);

  useEffect(() => {
    fetchProfile(dispatch);
    // fetchStats(dispatch);

    if (history.location.pathname === "/") {
      // history.push("/lang/en/level/1");
      history.push("/course");

    }
  }, []);

  // useEffect(() => {
  //   setHistory(props.history);
  // }, [props.history]);

  // useEffect(() => {
  //   if (profile !== null)
  //     fetchErroredProblems(dispatch, {
  //       user_id: profile.user_id,
  //     });
  //   //console.log(profile)
  // }, [profile]);

  return (
    <BrowserRouter history={history}>
      <div className={""}>
       
        <div className={"container"} style={{maxWidth:"960px"}}>
         
         
          {/* <div className={"mid-body"}> */}
          <div >
            <Switch>
              
              <Route
                path="/problem/:problem_id"
                exact
                component={ProblemContainer}
              />
              
              <Route
                path="/course"
                exact
                component={CourseList}
              />
              <Route
                path="/course/:course_id"
                exact
                component={ProblemList}
              />
              <Route 
                path="/submission/:submission_id"
                exact
                component={SubmissionContainer}
              />
              
            </Switch>
          </div>
        </div>
       
      </div>
      
    </BrowserRouter>
  );
};

export default Main;
