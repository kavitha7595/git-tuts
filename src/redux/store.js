import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./reduxtoolkit/slices/countSlice";

const store = configureStore({
  reducer: {
    count: countReducer
  },
});

export default store;