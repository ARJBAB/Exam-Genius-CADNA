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

  async createPost({ caption, category, images = [] }) {
    try {
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('category', category);
      images.forEach((image) => formData.append('images', image));

      const response = await apiClient.post(API_ENDPOINTS.TIMELINE, formData);
      return { success: true, data: response.data || response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updatePost(postId, { caption, category }) {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.TIMELINE_POST(postId), {
        caption,
        category,
      });
      return { success: true, data: response.data || response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async deletePost(postId) {
    try {
      await apiClient.delete(API_ENDPOINTS.TIMELINE_POST(postId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

export default timelineService;
