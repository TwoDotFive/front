import apiClient from '@/api/index';

// 팬풀로그 상세정보 조회
export const getFanpoolLog = async (fanPoolLogId: string) => {
	const response = await apiClient.get(
		`${process.env.NEXT_PUBLIC_API_URL}/tour/log`,
		{
			params: { id: fanPoolLogId },
		}
	);
	return response;
};

// 팬풀로그 삭제
export const deleteFanpoolLog = async (fanPoolLogId: string) => {
	const response = await apiClient.delete(
		`${process.env.NEXT_PUBLIC_API_URL}/tour/log`,
		{
			params: { id: fanPoolLogId },
		}
	);
	return response;
};

// 팬풀로그 북마크 여부 조회
export const getBookmark = async (fanPoolLogId: string) => {
	const response = await apiClient.get(
		`${process.env.NEXT_PUBLIC_API_URL}/tour/log/${fanPoolLogId}/bookmark`
	);
	return response;
};

// 팬풀로그 북마크 추가
export const addBookmark = async (fanPoolLogId: string) => {
	const response = await apiClient.post(
		`${process.env.NEXT_PUBLIC_API_URL}/tour/log/${fanPoolLogId}/bookmark`
	);
	return response;
};

// 팬풀로그 북마크 삭제
export const deleteBookmark = async (fanPoolLogId: string) => {
	const response = await apiClient.delete(
		`${process.env.NEXT_PUBLIC_API_URL}/tour/log/${fanPoolLogId}/bookmark`
	);
	return response;
};

export const getFanpoolLogsByUser = async (
	userId: BigInt,
	lastId?: string,
	pageSize: number = 6
) => {
	const params: Record<string, string | number> = { pageSize };

	if (lastId) {
		params.lastId = lastId;
	}

	const response = await apiClient.get(
		`${process.env.NEXT_PUBLIC_API_URL}/tour/log/find-by-user/${userId}`,
		{ params }
	);

	return response.data;
};
