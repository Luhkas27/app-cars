import { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';

import api from './api';

interface ErrorResponse {
  message: string;
}

export async function signIn(user: string, password: string) {
  try {
    const response = await api.post('/signIn', { user, password });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: axiosError.response?.data?.message || 'An error occurred',
      });
    }
    throw error;
  }
}
