import apiClient from '@/api';

export const getTourInfoDetail = async (
	contentId: string,
	contentType: string
) => {
	const response = await apiClient.get(`/tour/info/details`, {
		params: {
			contentId,
			contentTypeId: contentType,
		},
	});
	return response.data;
};

export const getFanpoolLogAboutPlace = async (
	contentId: string,
	contentType: string
) => {
	const response = await apiClient.get(`/tour/log/find-by-place`, {
		params: {
			contentId,
			contentTypeId: contentType,
		},
	});
	return response;
};
