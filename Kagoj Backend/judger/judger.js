var child_process = require('child_process');
var shell = require('shelljs');
var fs = require('fs');
const { type } = require('os');

const VerdictRepository = require('../database/verdictRepository');
const verdictRepository = require('../database/verdictRepository');

/**
 * @param {string} command A shell command to execute
 * @return {Promise<string>} A promise that resolve to the output of the shell command, or an error
 * @example const output = await execute("ls -alh");
 */
function execute(command) {
    /**
     * @param {Function} resolve A function that resolves the promise
     * @param {Function} reject A function that fails the promise
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
     */
    return new Promise(function(resolve, reject) {
      /**
       * @param {Error} error An error triggered during the execution of the childProcess.exec command
       * @param {string|Buffer} standardOutput The result of the shell command execution
       * @param {string|Buffer} standardError The error resulting of the shell command execution
       * @see https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
       */
      // console.log(command);
      child_process.exec(command, function(error, standardOutput, standardError) {
        if (error) {
          // console.log(error);
          reject();
  
          return;
        }
  
        if (standardError) {
          // console.log(standardError);
          reject(standardError);
  
          return;
        }
  
        resolve(standardOutput);
      });
    });
  }

  const run_code = async function (submission_id,test_id,language) {
    
      
    try{
      const compile = await execute(`g++ file/submissions/${submission_id}.cpp -o main `);
      console.log("Compilation successfull");
    }catch(error){
      console.log("Compile error");
      const verdicts = [];
      for(let i=0;i<test_id.length;i++){
        const result = {
          "cpu_time": 0,
          "real_time": 0,
          "memory": 0,
          "signal": 0,
          "exit_code": 0,
          "error": 1,
          "result": 6
        }
        verdictRepository.updateVerdict({result: result.result, runtime: result.real_time, memory: result.memory, submission_id: submission_id, test_id: test_id[i]});
        verdicts.push(result);
      }
      return verdicts;
     
    }
    
    const verdicts = [];
    for(let i=0;i<test_id.length;i++){
      try{
        let pass = process.env.OS_PASS;
        const run = await execute(`echo ${pass} | sudo -S  ./judger/libjudger.so --max_cpu_time=100 --max_real_time=1000 --max_memory=130023424 --exe_path=main --input_path=file/input/${test_id[i]}.in --output_path=judger/output.out --error_path=judger/error.out `);
        console.log("Runtime successfull");
        // console.log(run);
        
        const result = JSON.parse(run);
        if( result.result === 0 ){
          let checkR = await execute(`./judger/compare.sh file/output/${test_id[i]}.out judger/output.out`);
          checkR = parseInt(checkR);
          if( checkR === 0 ) result.result = 6;
        }
        verdictRepository.updateVerdict({result: result.result, runtime: result.real_time, memory: result.memory, submission_id: submission_id, test_id: test_id[i]});
        
        verdicts.push(result);
        
      } catch (error) {
        const result = {
          "cpu_time": 0,
          "real_time": 0,
          "memory": 0,
          "signal": 0,
          "exit_code": 0,
          "error": 1,
          "result": 6
      }
      console.log("error");
      console.log(error);
        verdictRepository.updateVerdict({result: result.result, runtime: result.real_time, memory: result.memory, submission_id: submission_id, test_id: test_id[i]});
        verdicts.push(result);
      }
    }
    
   
    return verdicts;
      
      
      
      
      // const command = await execute("cd output && ls && echo 19021999 | sudo -S ./libjudger.so --exe_path=main ");
     // const command2 = await execute("cd output && ls ");
    //  var ret = shell.exec('echo 19021999 | sudo -S  ./libjudger.so --output_path=output.out --max_cpu_time=1000 --max_real_time=1000 --max_memory=130023424 --exe_path=main.exe --input_path=input.in --error_path=error.out ')
    
  
    
  }
  
  module.exports = run_code;
  // run_code(1,[1,2],[1,2]);