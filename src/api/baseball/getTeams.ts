import { Team } from '@/types/types';
import apiClient from '..';

/**
 * 팀 목록을 가져오는 함수
 *
 * @returns {Promise<Team[]>} 팀 목록 응답
 */
const getTeams = async (): Promise<Team[]> => {
	const response = await apiClient.get<Team[]>('/baseball/team?year=2024');
	return response.data;
};

export default getTeams;
