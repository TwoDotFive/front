import apiClient from '..';

/**
 * 카카오 로그인을 처리하는 함수
 *
 * @returns {Promise<any>} 카카오 로그인 응답
 */
const getKakaoLogin = async (): Promise<any> => {
	const response = await apiClient.get('/auth/kakao/login');
	return response.data;
};

export default getKakaoLogin;
