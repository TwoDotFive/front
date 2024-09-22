import apiClient from '..';

/**
 * 사용자 프로필 패치 요청 파라미터
 *
 * @param {string} [email] 사용자 이메일 (선택적)
 * @param {string} [nickname] 사용자 닉네임 (선택적)
 * @param {string} [profileImageUrl] 사용자 프로필 이미지 URL (선택적)
 * @param {string} [name] 사용자 이름 (선택적)
 * @param {string} [oneLiner] 사용자 자기소개 (선택적)
 * @param {string} [userRole] 사용자 역할 (선택적)
 * @param {FavoriteTeam} [favoritTeam] 사용자가 즐겨찾는 팀 정보 (선택적)
 * @param {number} [hostedFanpoolNumber] 사용자가 호스트한 팬풀 수 (선택적)
 */
interface PatchUserProfileRequest {
	email?: string;
	nickname?: string;
	profileImageUrl?: string;
	name?: string;
	oneLiner?: string;
	userRole?: string;
	favoritTeam?: {
		id?: number;
		name?: string;
		representativeImageUrl?: string;
		stadiumName?: string;
		stadiumAliasName?: string;
	};
	hostedFanpoolNumber?: number;
}

/**
 * 사용자 프로필 패치
 *
 * @param {PatchUserProfileRequest} requestBody 패치할 사용자 프로필 데이터
 * @returns {Promise<void>} 요청 성공 여부
 */
const patchUserProfile = async (
	requestBody: PatchUserProfileRequest
): Promise<void> => {
	await apiClient.patch('/user/profile', requestBody);
};

export default patchUserProfile;
