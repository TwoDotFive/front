import apiClient from '..';

/**
 * 팀 정보 응답 인터페이스
 *
 * @param {number} id 팀 ID
 * @param {string} name 팀 이름
 * @param {string} representativeImageUrl 팀 이미지 URL
 * @param {string} stadiumName 팀 경기장 이름
 * @param {string} stadiumAliasName 팀 경기장 별칭
 */
interface Team {
	id: number;
	name: string;
	representativeImageUrl: string;
	stadiumName: string;
	stadiumAliasName: string;
}

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
