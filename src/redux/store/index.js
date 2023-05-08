import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import productsReducer from "../reducers/productReducer";
import loginReducer from "../reducers/loginReducer";
import { registerUserReducer } from "../reducers/registerUserReducer";
import usersReducer from "../reducers/usersReducer";

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
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    });
  },
});

const persistedStore = persistStore(store);

export { store, persistedStore };
