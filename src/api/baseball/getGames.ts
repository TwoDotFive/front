import { GameResponse } from '@/types/types';
import apiClient from '..';
/**
 * 특정 팀의 게임 목록을 가져오는 함수
 *
 * @param {number} teamId 팀 ID
 * @returns {Promise<GameResponse>} 게임 목록 응답
 */
const getGames = async (teamId: number): Promise<GameResponse> => {
	const response = await apiClient.get<GameResponse>(
		`/baseball/game?teamId=${teamId}`
	);
	return response.data;
};

export default getGames;
