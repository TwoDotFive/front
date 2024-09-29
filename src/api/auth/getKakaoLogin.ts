import apiClient from '..';

interface getKakaoLoginResponse {
	accessToken: string;
	refreshToken: string;
	userRole: string;
	firstLogin: string;
}

/**
 * 카카오 로그인 후 토큰을 가져오는 함수
 *
 * @param {string} code 팬풀 ID
 * @returns {Promise<getKakaoLoginResponse>} 해당 팬풀의 상세 정보 응답
 */
const getKakaoLoginToken = async (
	code: string
): Promise<getKakaoLoginResponse> => {
	const response = await apiClient.get<getKakaoLoginResponse>(
		`/kakao/login/redirect?code=${code}`
	);
	return response.data;
};

export default getKakaoLoginToken;
