import axios, { AxiosInstance } from 'axios';
import BigInt from 'json-bigint';

/**
 * Axios 인스턴스 생성
 */
const apiClient: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	transformResponse: function (response) {
		// 빈 응답을 처리하는 조건 추가
		if (!response || response === '') {
			return null; // 빈 응답일 경우 null 반환
		}

		// JSONBig으로 응답 처리
		return BigInt().parse(response);
	},
});

/**
 * Axios 요청 인터셉터 설정
 */
apiClient.interceptors.request.use(
	(config) => {
		// 요청 전 작업, 예: 토큰 추가
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		// 요청 오류 처리
		return Promise.reject(error);
	}
);

/**
 * Axios 응답 인터셉터 설정
 */
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// 응답 오류 처리
		if (error.response && error.response.status === 401) {
			// 예: 인증 오류 시 처리
			console.error('Unauthorized, redirect to login');
		}
		return Promise.reject(error);
	}
);

export default apiClient;
