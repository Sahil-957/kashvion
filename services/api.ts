import axios from 'axios';
import Constants from 'expo-constants';

const inferredHost = Constants.expoConfig?.hostUri?.split(':')[0];

const baseURL =
  process.env.EXPO_PUBLIC_API_URL ||
  (inferredHost ? `http://${inferredHost}:4000/api` : 'http://localhost:4000/api');

export const api = axios.create({
  baseURL,
  timeout: 10000,
});
