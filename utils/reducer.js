export const initState = {
  view: "home",
  user: null,
  error: "",
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_VIEW":
      return {
        ...state,
        view: action.param,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.param,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.param,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        view: "home",
      };
    default:
      return state;
  }
};
