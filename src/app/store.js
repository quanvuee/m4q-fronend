import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import medShowReducer from '../components/medShowSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    medShow: medShowReducer,
  },
});
