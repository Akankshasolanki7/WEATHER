import { configureStore } from '@reduxjs/toolkit';
import WeatherSlice from '../features/WeatherSlice';
import snackbarSlice from '../features/snackbarSlice';

export const store = configureStore({
  reducer: {
    weather: WeatherSlice,
    snackbar:snackbarSlice,
  },
});
