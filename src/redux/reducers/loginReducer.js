import { GET_ALL_LOGIN } from "../actions";

const initialState = {
  loginUser: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LOGIN:
      return action.payload;
    default:
      return state;
  }
};

export default loginReducer;
