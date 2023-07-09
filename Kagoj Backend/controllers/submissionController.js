const express = require('express');
const fs = require('fs');
const judge = require('../judger/judger');
const router = express.Router()

const submissionRepository = require('../database/submissionRepository');
const TestRepository = require('../database/testRepository');
const VerdictRepository = require('../database/verdictRepository');




router.post('/submit', submit = async (req, res) => {
   
    const user = req.user;
    const submission = req.body;
    console.log(submission);
    const {problem_id, code, language_id} = submission;
    const result = await submissionRepository.createSubmission({problem_id, author_id: user.user_id, language_id});
    if( !result.success || result.data.length === 0 ){
        res.status(500).send({"error":"Internal server error"});
        return;
    }
    console.log(result);
    
    const submission_id = result.data[0].create_submission;
    // const submission_id = 11;
    try {
        fs.writeFileSync(`file/submissions/${submission_id}.cpp`, code);
        console.log('File written successfully');
        // file written successfully
      } catch (err) {
        console.error(err);
      }
      res.status(200).send({submission_id});

      const tests = await TestRepository.getAllByProblemId(problem_id);
      const inputs = tests.data.map(test => test.test_id);
      console.log(inputs);
      // return;
      const verdicts = await judge(submission_id,inputs);
      let status = 0;
      for( let i = 0 ; i < verdicts.length ; i++ ){
          const verdict = verdicts[i];
          if( verdict.result !== 0 ) status = 6;
      }
      await submissionRepository.updateVerdict(submission_id,status, status);
      
      // console.log(result);
    
});


router.get('/getVerdicts/:submission_id', getVerdict = async (req, res) => {
  const user = req.user;
  const submission_id = req.params.submission_id;
  const result = await VerdictRepository.getAllBySubmissionId(submission_id, user.user_id);
  if( !result.success || result.data.length === 0 ){
      res.status(500).send({"error":"Internal server error"});
      return;
  }
  res.status(200).send(result.data);
});

router.get('/getSubmission/:submission_id', getSubmission = async (req, res) => {
  const user = req.user;
  const submission_id = req.params.submission_id;
  const result = await submissionRepository.getSubmissionById(submission_id,user.user_id);
  if( !result.success || result.data.length === 0 ){
      res.status(500).send({"error":"Internal server error"});
      return;
  }
  // read submission file 
  const submission = result.data[0];
  const code = fs.readFileSync(`file/submissions/${submission_id}.cpp`, 'utf8');
  submission.code = code;

  // get verdicts
  const verdicts = await VerdictRepository.getAllBySubmissionId(submission_id, user.user_id);
  if( !verdicts.success || verdicts.data.length === 0 ){
      res.status(500).send({"error":"Internal server error"});
      return;
  }
  submission.verdicts = verdicts.data;

  res.status(200).send(submission);
});

router.get('/getSubmissions/:problem_id', getSubmissions = async (req, res) => {
  const user = req.user;
  const problem_id = req.params.problem_id;
  const result = await submissionRepository.getAllByProblemId(problem_id,user.user_id);
  if( !result.success || result.data.length === 0 ){
      res.status(500).send({"error":"Internal server error"});
      return;
  }
  res.status(200).send(result.data);
});

router.get('/getSubmissionsByUser/:user_id', getSubmissionsByUser = async (req, res) => {
    const user_id = req.params.user_id;
    const result = await submissionRepository.getAllByUserId(user_id);
    if( !result.success || result.data.length === 0 ){
        res.status(500).send({"error":"Internal server error"});
        return;
    } 
    res.status(200).send(result.data);
});




module.exports = router;