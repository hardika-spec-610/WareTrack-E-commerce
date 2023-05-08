import { PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS } from "../actions";

const initialState = {
  products: [],
  isLoading: true,
  isError: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        isError: false,
      };
    case PRODUCT_LIST_FAIL:
      return {
        isLoading: false,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
