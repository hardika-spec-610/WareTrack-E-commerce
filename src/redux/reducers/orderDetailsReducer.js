import {
  ORDER_DETAILS_ERROR,
  ORDER_DETAILS_LOADING,
  ORDER_DETAILS_SUCCESS,
} from "../actions";

const initialState = {
  orders: [],
  isLoading: true,
  isError: false,
};

const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case ORDER_DETAILS_LOADING:
      //   console.log(action.payload);
      return {
        ...state,
        isLoading: action.payload,
      };

    case ORDER_DETAILS_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export default orderDetailsReducer;
