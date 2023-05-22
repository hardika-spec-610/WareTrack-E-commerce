import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../actions";

const initialState = {
  products: [],
  isLoading: true,
  isError: false,
};

const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        products: action.payload,
        isLoading: false,
        isError: false,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        isLoading: false,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export default productDetailReducer;
