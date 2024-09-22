import { FanpoolInformation } from '@/types/types';
import apiClient from '..';

/**
 * 팬풀 필터링 정보 응답 인터페이스
 */
interface FanpoolFilterResponse {
	result: FanpoolInformation[];
}

/**
 * 팬풀 필터링 정보를 가져오는 함수
 *
 * @param {number} [teamId] 팀 고유 아이디 (기본값: 전체)
 * @param {string} [dongCd] 법정동 고유 코드
 * @param {number[]} [gameId] 선택된 게임 ID 리스트
 * @param {string} [departAt] 팬풀 모집 날짜 (timestamp 형식)
 * @param {boolean} [onlyGathering] 모집 완료된 팬풀 제외 여부
 * @param {number} [page] 페이지 넘버 (기본값: 0)
 * @param {number} [size] 페이지 사이즈 (기본값: 10)
 *
 * @returns {Promise<FanpoolFilterResponse>} 팬풀 필터링 정보 응답
 */
const getFanpoolFilter = async ({
	teamId,
	dongCd,
	gameId = [],
	departAt,
	onlyGathering,
	page = 0,
	size = 10,
}: {
	teamId?: number;
	dongCd?: string;
	gameId?: number[];
	departAt?: string;
	onlyGathering?: boolean;
	page?: number;
	size?: number;
}): Promise<FanpoolFilterResponse> => {
	const response = await apiClient.get<FanpoolFilterResponse>(
		'/fanpool/filter',
		{
			params: {
				teamId,
				dongCd,
				gameId,
				departAt,
				onlyGathering,
				page,
				size,
			},
		}
	);

	return response.data;
};

export default getFanpoolFilter;
