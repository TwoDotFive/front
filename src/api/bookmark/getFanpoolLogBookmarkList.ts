import apiClient from '@/api/index';

export const getFanpoolLogBookmarkList = async () => {
	const response = await apiClient.get(`/tour/log/bookmark`);
	return response;
};
