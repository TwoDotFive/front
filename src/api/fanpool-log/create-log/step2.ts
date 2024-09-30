import apiClient from '@/api/index';

export const getStadiumInfo = async () => {
	const response = await apiClient.get(`/tour/stadium/list`);
	return response;
};

export const getTourInfo = async (
	x: string,
	y: string,
	selectedTagId: string | null,
	pageNumber: number
) => {
	const radius = '2000';
	const pageSize = 20;

	const response = await apiClient.get(`/tour/info`, {
		params: {
			pageSize,
			pageNumber,
			x,
			y,
			radius,
			contentTypeId: selectedTagId,
		},
	});
	return response.data.items;
};
