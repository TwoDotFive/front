import { FanpoolInformation } from '@/types/types';
import apiClient from '..';

/**
 * 팬풀 조회 응답 인터페이스
 */
interface FanpoolResponse {
	fanpoolInformation: FanpoolInformation[];
}

/**
 * 팬풀 정보를 가져오는 함수
 *
 * @param {string} userId 사용자 고유 ID (필수)
 * @param {number} [page=0] 페이지 넘버 (기본값: 0)
 * @param {number} [size=10] 페이지 사이즈 (기본값: 10)
 *
 * @returns {Promise<FanpoolResponse>} 팬풀 정보 응답
 */
const getFanpool = async ({
	userId,
	page = 0,
	size = 10,
}: {
	userId: string | BigInt;
	page?: number;
	size?: number;
}): Promise<FanpoolResponse> => {
	const response = await apiClient.get<FanpoolResponse>('/fanpool', {
		params: {
			userId,
			page,
			size,
		},
	});

	return response.data;
};

export default getFanpool;
