import { configureStore } from "@reduxjs/toolkit";
import createReducer from "./reducers";
import routingMiddleware from "./routingMiddleware";

const store = configureStore({
  reducer: createReducer(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routingMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

// پشتیبانی از Hot Module Replacement (HMR) برای Reducerها
// if (module.hot) {
//   module.hot.accept("./reducers", () => {
//     const newCreateReducer = require("./reducers").default;
//     store.replaceReducer(newCreateReducer(history));
//   });
// }

export default store;
