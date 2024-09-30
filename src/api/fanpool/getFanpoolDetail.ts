import { FanpoolInformation } from '@/types/types';
import apiClient from '..';

interface FanpoolDetailResponse {
	fanpoolInformation: FanpoolInformation;
}

/**
 * 팬풀 상세 정보를 가져오는 함수
 *
 * @param {number} fanpoolId 팬풀 ID
 * @returns {Promise<FanpoolDetailResponse>} 해당 팬풀의 상세 정보 응답
 */
const getFanpoolDetail = async (
	fanpoolId: number
): Promise<FanpoolDetailResponse> => {
	const response = await apiClient.get<FanpoolDetailResponse>(
		`/fanpool/${fanpoolId}`
	);
	return response.data;
};

export default getFanpoolDetail;
