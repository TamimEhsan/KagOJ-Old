- person(id,email,password,authority)
- profile(id,user_id,name,image,type,designation)
- courses(id,name,)
- course_assign(course_id,user_id)
- problem(id,name,course_id,statement,input,output,notes,source_limit,time_limit,memory_limit)
- language(id,name,compile_command,run_command)
- test(id,problem_id,serial,type)
- submission(id,problem_id,author_id,submisstion_time,lang_id,final_verdict,partial_verdict)
- verdict(id,test_id,result,runtime,memory)
- 