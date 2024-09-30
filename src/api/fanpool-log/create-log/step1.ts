import apiClient from '@/api/index';

export const getStadiumList = async () => {
	try {
		const response = await apiClient.get(`/baseball/stadium/list`);
		return response.data;
	} catch (e) {
		if (e) return e;
	}
};
