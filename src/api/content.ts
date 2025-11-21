import { xuperApi } from './api';
import type { DownloadResponse } from '../types/api.types';

export const contentApi = {
  getDownloads: async (): Promise<DownloadResponse> => {
    const response = await xuperApi.get<DownloadResponse>('/api/xuper/download');
    return response.data;
  },
};
