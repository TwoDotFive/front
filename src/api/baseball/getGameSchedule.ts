import { Game } from '@/types/types';
import apiClient from '..';

/**
 * 경기를 가져오는 함수
 *
 * @param {number} teamId 팀 ID
 * @returns {Promise<{ games: Game[], numberOfGame: number }>} 해당 팀의 경기 목록 응답
 */
const getGameSchedule = async (): Promise<{
	games: Game[];
	numberOfGame: number;
}> => {
	const response = await apiClient.get<{
		games: Game[];
		numberOfGame: number;
	}>(`/baseball/game/schedules?year=2024`);

	return {
		games: response.data.games,
		numberOfGame: response.data.numberOfGame,
	};
};

export default getGameSchedule;
