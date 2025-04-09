// Import the dynamic API client
import apiRequest from '../services/apiClient';
const destination_weather='https://api.openweathermap.org/data/2.5';

const createApiThunk =
  (method, endpoint) =>
  async ({ payload, optionEndpoint }, { rejectWithValue }) => {
    try {
      let response;
      let endpoint1 = endpoint;
      if (optionEndpoint !== undefined && endpoint === undefined) {
        endpoint1 = `${destination_weather}/${optionEndpoint}`;
      }
      // Handle POST request (payload in body)
      if (method === 'POST') {
        response = await apiRequest(method, endpoint1, null, payload);
      }

      // Handle GET request (params in query string)
      else if (method === 'GET') {
        response = await apiRequest(method, endpoint1, payload, null);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message || 'Unknown Error');
    }
  };

export default createApiThunk;
