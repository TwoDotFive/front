import { Game } from '@/types/types';
import apiClient from '..';

/**
 * 경기를 가져오는 함수
 *
 * @param {number} teamId 팀 ID
 * @returns {Promise<Game[]>} 해당 팀의 경기 목록 응답
 */
const getGame = async (teamId: number): Promise<Game[]> => {
	const response = await apiClient.get<{ games: Game[] }>(
		`/baseball/game?teamId=${teamId}`
	);
	return response.data.games;
};

export default getGame;
