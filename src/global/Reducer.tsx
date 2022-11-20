const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
      };
    case "update":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "logout":
      localStorage.clear();
      return {
        ...state,
        user: null,
        token: null,
      };

    default:
      return {
        ...state,
      };
  }
};

export default Reducer;
