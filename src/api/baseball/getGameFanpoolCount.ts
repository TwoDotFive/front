import apiClient from '..';

/**
 * 특정 게임의 팬풀 수를 가져오는 함수
 *
 * @param {string} gameId 게임 ID
 * @returns {Promise<{ id: string }>} 해당 게임의 팬풀 수 응답
 */
const getGameFanpoolCount = async (gameId: string): Promise<{ id: string }> => {
	const response = await apiClient.get<{ id: string }>(
		`/baseball/game/${gameId}`
	);
	return response.data;
};

export default getGameFanpoolCount;
