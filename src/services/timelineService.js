import { apiClient, API_ENDPOINTS } from '../config/api';

export const timelineService = {
  async getTimeline() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TIMELINE, {
        skipAuthRedirect: true,
      });
      return { success: true, data: response.data || response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

export default timelineService;
