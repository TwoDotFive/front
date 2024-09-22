import apiClient from '..';

/**
 * 사용자 프로필 요청 파라미터
 *
 * @param {string} userId 사용자 ID
 */
interface UserProfileRequest {
	userId: string;
}

/**
 * 즐겨찾는 팀 정보
 *
 * @param {number} id 팀 ID
 * @param {string} name 팀 이름
 * @param {string} representativeImageUrl 팀 대표 이미지 URL
 * @param {string} stadiumName 경기장 이름
 * @param {string} stadiumAliasName 경기장 별칭
 */
interface FavoriteTeam {
	id: number;
	name: string;
	representativeImageUrl: string;
	stadiumName: string;
	stadiumAliasName: string;
}

/**
 * 사용자 프로필 응답 파라미터
 *
 * @param {string} email 사용자 이메일
 * @param {string} nickname 사용자 닉네임
 * @param {string} profileImageUrl 사용자 프로필 이미지 URL
 * @param {string} name 사용자 이름
 * @param {string} oneLiner 사용자 자기소개
 * @param {string} userRole 사용자 역할
 * @param {FavoriteTeam} favoritTeam 사용자가 즐겨찾는 팀 정보
 * @param {number} hostedFanpoolNumber 사용자가 호스트한 팬풀 수
 */
interface UserProfileResponse {
	email: string;
	nickname: string;
	profileImageUrl: string;
	name: string;
	oneLiner: string;
	userRole: string;
	favoritTeam: FavoriteTeam;
	hostedFanpoolNumber: number;
}

/**
 * 사용자 프로필 조회
 *
 * @param {UserProfileRequest} requestParameters 사용자 프로필 요청 파라미터
 * @returns {Promise<UserProfileResponse>} 사용자 프로필 응답
 */
const getUserProfile = async (
	requestParameters: UserProfileRequest
): Promise<UserProfileResponse> => {
	// GET 요청으로 userId를 경로 파라미터로 전달
	const response = await apiClient.get<UserProfileResponse>(
		`/user/profile/${requestParameters.userId}`
	);

	return response.data;
};

export default getUserProfile;
