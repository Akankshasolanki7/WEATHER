import { createAsyncThunk } from '@reduxjs/toolkit';
import createApiThunk from '../helpers/apiThunkHelper';
export const fetchWeatherDetails = createAsyncThunk(
  'weather/getDetails',
  createApiThunk(
    'GET',
    // `${destination_IDM}/v1/application/hierarchy?app=${appId}&isAuthoring=true&mode=DT`
  )
);
export const fetchWeatherDetailsNext5 = createAsyncThunk(
    'weather/next5',
    createApiThunk(
      'GET',
      // `${destination_IDM}/v1/application/hierarchy?app=${appId}&isAuthoring=true&mode=DT`
    )
  );

