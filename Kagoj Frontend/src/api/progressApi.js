import Api from "./base";
class ProgressApi extends Api {
  getAllSolvedProblems = async (lang = "en") => {
    return await this.get(`api/progress/solvedProblems/` + lang);
  };
  getAllSubmissions = async (lang = "en") => {
    return await this.get(`api/progress/submissions/` + lang);
  };
}

export default ProgressApi;
