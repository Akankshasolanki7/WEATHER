import axios from 'axios';
const apiClient = axios.create();
const apiRequest = async (method, endpoint, params = null, data = null) => {
  try {
    const URL = endpoint;
    const response = await apiClient({
      method,
      url: URL,
      data,
      params,
    });

    return response.data;
  } catch (error) {
    console.error('API Request failed', error.message);
    throw error;
  }
};

export default apiRequest;
