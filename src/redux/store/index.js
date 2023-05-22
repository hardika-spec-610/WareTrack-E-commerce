import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import productsReducer from "../reducers/productReducer";
import loginReducer from "../reducers/loginReducer";
import { registerUserReducer } from "../reducers/registerUserReducer";
import usersReducer from "../reducers/usersReducer";
import productDetailReducer from "../reducers/ProductDeatilReducer";
import cartReducer from "../reducers/CartReducer";
import userProfileReducer from "../reducers/userProfileReducer";
import { orderCreateReducer, orderPayReducer } from "../reducers/orderReducer";
import orderDetailsReducer from "../reducers/orderDetailsReducer";
import myOrderReducer from "../reducers/myOrderReducer";

const persistConfig = {
  storage: sessionStorage,
  key: "root", // this brings the whole redux store into persistency
  // transforms: [
  //   encryptTransform({
  //     secretKey: process.env.REACT_APP_ENV_SECRET_SUPER_SP0TYFY_KEY_SECOND2,
  //   }),
  // ],
};
const combinedReducer = combineReducers({
  login: loginReducer,
  register: registerUserReducer,
  allUsers: usersReducer,
  productList: productsReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  profile: userProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrders: myOrderReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : [];
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage, //
  },
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  initialState,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    });
  },
});

const persistedStore = persistStore(store);

export { store, persistedStore };
