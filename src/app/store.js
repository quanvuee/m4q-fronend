import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import medShowReducer from "../components/medDetail/medShowSlice";
import medsReducer from "../components/medications/medicationsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    medShow: medShowReducer,
    medications: medsReducer,
  },
});
