const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case "preLogin":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case "update":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
      };
    case "logout":
      localStorage.clear();
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default Reducer;
