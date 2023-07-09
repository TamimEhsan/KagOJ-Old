export const erroredProblemsReducer = (state = null, action) => {

  switch (action.type) {
    case "UPDATE_ERRORED_PROBLEMS":
      return action.data;
    default:
      return state;
  }
};
