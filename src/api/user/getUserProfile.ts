import { UserProfileResponse } from '@/types/types';
import apiClient from '..';

/**
 * 사용자 프로필 요청 파라미터
 *
 * @param {string} userId 사용자 ID
 */
interface UserProfileRequest {
	userId: string | BigInt;
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
		`/user/profile/${requestParameters.userId || 0} `
	);
	return response.data;
};

export default getUserProfile;
