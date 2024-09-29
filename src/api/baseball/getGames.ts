import { Game } from '@/types/types';
import apiClient from '..';

/**
 * 경기를 가져오는 함수
 *
 * @param {number | string} teamId 팀 ID (빈 문자열일 경우 제외)
 * @param {string} date 검색할 날짜 (YYYY-MM-DD 형식)
 * @returns {Promise<Game[]>} 해당 팀의 경기 목록 응답
 */
const getGame = async (teamId: string, date: string): Promise<Game[]> => {
	// 쿼리 파라미터를 동적으로 생성
	const params: Record<string, string> = {
		startDate: date,
		endDate: date,
	};

	// teamId가 존재하는 경우에만 쿼리 파라미터에 추가
	if (teamId !== '') {
		params.teamId = teamId.toString();
	}

	const queryString = new URLSearchParams(params).toString();

	// API 요청
	const response = await apiClient.get<{ games: Game[] }>(
		`/baseball/game?${queryString}`
	);
	return response.data.games;
};

export default getGame;
