import { createSlice } from '@reduxjs/toolkit';
import { fetchWeatherDetails, fetchWeatherDetailsNext5 } from './WeatherThunk';

const initialState = {
  data: { weather: {}, next: [] },
  loading: { weather: false, next: false },
  error: { weather: null, next: null },
  theme:true
};

const WeatherSlice = createSlice({
  name: 'Weather',
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = !state.theme;
    }

  },
  extraReducers: builder => {
    builder
      // Fetch current weather
      .addCase(fetchWeatherDetails.pending, state => {
        state.loading.weather = true;
        state.error.weather = null;
      })
      .addCase(fetchWeatherDetails.fulfilled, (state, action) => {
        state.loading.weather = false;
        state.data.weather = {
          cityDetails: action?.payload?.city,
          weatherData: action?.payload?.list?.[0]?.weather?.[0],
          mainData: action?.payload?.list?.[0]?.main,
          windData: action?.payload?.list?.[0]?.wind,
        };
        state.error.weather= null;
      })
      .addCase(fetchWeatherDetails.rejected, (state, action) => {
        state.loading.weather = false;
        state.error.weather = action.payload || 'Failed to load weather data';
      })

      // Fetch next 5 days
      .addCase(fetchWeatherDetailsNext5.pending, state => {
        state.loading.next = true;
        state.error.next = null;
      })
      .addCase(fetchWeatherDetailsNext5.fulfilled, (state, action) => {
        state.loading.next = false;
        state.data.next = action.payload.list;
      })
      .addCase(fetchWeatherDetailsNext5.rejected, (state, action) => {
        state.loading.next = false;
        state.error.next = action.payload || 'Failed to load forecast data';
      });
  },
});
export const { setTheme } = WeatherSlice.actions;
export default WeatherSlice.reducer;
