DROP FUNCTION create_submission(integer,integer,integer);
create or replace function create_submission(problem_id_in int, author_id_in int,language_id_in int)
returns int
language plpgsql
as
$$
declare
   submission_id_out integer;
   indiv_test record;
begin
	insert 
		into submission(problem_id,author_id,language_id,partial_verdict,final_verdict) 
		values(problem_id_in,author_id_in,language_id_in,7,7)
		returning submission_id into submission_id_out;
	for indiv_test in 
		select * from test where problem_id = problem_id_in
	loop 
		insert 
		into verdict(test_id,result,runtime,memory,submission_id) 
		values(indiv_test.test_id,7,0,0,submission_id_out);
	end loop;
	
	return submission_id_out;
end;
$$;