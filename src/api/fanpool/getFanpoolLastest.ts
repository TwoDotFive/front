import { FanpoolInformation } from '@/types/types';
import apiClient from '..';

/**
 * 팬풀 최신 정보 응답 인터페이스
 */
interface FanpoolLatestResponse {
	fanpoolInformation: FanpoolInformation[];
}

/**
 * 팬풀 최신 정보를 가져오는 함수
 *
 * @returns {Promise<FanpoolLatestResponse>} 팬풀 최신 정보 응답
 */
const getFanpoolLatest = async (): Promise<FanpoolLatestResponse> => {
	const response = await apiClient.get<FanpoolLatestResponse>(
		'/fanpool/latest'
	);
	return response.data;
};

export default getFanpoolLatest;
