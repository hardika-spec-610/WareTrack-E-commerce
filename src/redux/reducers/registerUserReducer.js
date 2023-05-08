import { REGISTER_USER } from "../actions";

const initialState = {
  user: null,
};

export const registerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return action.payload;
    default:
      return state;
  }
};
