import axios from 'axios';

// Define allowed forecast types
type ForecastType = 'current' | 'forecast';

// Base URL configuration
const API_KEY = '19a8e6f825ee4134be433211240110';
const createBaseURL = (type: ForecastType) => 
  `/api/${type}.json?key=${API_KEY}`;

// Export base URLs for different endpoints
export const currentWeatherURL = createBaseURL('current');
export const forecastWeatherURL = createBaseURL('forecast');

// Alternative approach using an object map
const endpoints = {
  current: `/api/current.json?key=${API_KEY}`,
  forecast: `/api/forecast.json?key=${API_KEY}`
} as const;

export const fetchCurrentWeather = async (city: string) => {
  const response = await axios.get(`${endpoints.current}&q=${city}`);
  return response.data;
};

export const fetchForecastData = async (city: string) => {
  const response = await axios.get(`${endpoints.forecast}&q=${city}&days=3`);
  return response.data;
};
