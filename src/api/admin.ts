import { xuperApi } from './api';
import type { User } from '../types/api.types';

export const adminApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await xuperApi.get<User[]>('/xuper/users');
    return response.data;
  },
};
