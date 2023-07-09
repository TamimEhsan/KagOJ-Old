import axios from "axios";
import Cookies from "universal-cookie";
import { base_url } from "../";
import { setLoading, showToast } from "../App";
const cookies = new Cookies();



export const fetchCourses = () => {
  setLoading(true);
  return axios
    .get(base_url + "course", {
      headers: { authorization: cookies.get("token") },
    })
    .then((res) => {
      setLoading(false);
      return res.data;
    })
    .catch((err) => {
      setLoading(false);
      showToast("Error fetching data");
    });
};

export const fetchSerieses = (course_id) => {
  setLoading(true);
  return axios
    .get(base_url + "course/" + course_id, {
      headers: { authorization: cookies.get("token") },
    })
    .then((res) => {
      setLoading(false);
      return res.data;
    })
    .catch((err) => {
      setLoading(false);
      showToast("Error fetching data");
    });
};





export const fetchProblems = (problem_id) => {
  setLoading(true);
  return axios
    .get(`${base_url}problem/${problem_id}`, {
      headers: { authorization: cookies.get("token") },
    })
    .then((res) => {
      setLoading(false);
      return res.data;
    })
    .catch((err) => {
      setLoading(false);
      showToast("Error fetching data");
    });
};


export const fetchSubmissions = (problem_id) => {
  setLoading(true);
  return axios
    .get(`${base_url}submission/getSubmissions/${problem_id}`, {
      headers: { authorization: cookies.get("token") },
    })
    .then((res) => {
      setLoading(false);
      return res.data;
    })
    .catch((err) => {
      setLoading(false);
      showToast("Error fetching data");
    });
};

export const fetchSubmission = (submission_id) => {
  setLoading(true);
  return axios
    .get(`${base_url}submission/getSubmission/${submission_id}`, {
      headers: { authorization: cookies.get("token") },
    })
    .then((res) => {
      setLoading(false);
      return res.data;
    })
    .catch((err) => {
      setLoading(false);
      showToast("Error fetching data");
    });
};



export const submitSolution = (submission) => {
  return axios
    .post(base_url + "submission/submit", submission, {
      headers: { authorization: cookies.get("token") },
    })
    .then((res) => {
      return res.data;
      //console.log(res.data)
    })
    .catch((err) => {
      //console.log(err)
    });
};
