import apiClient from '..';

/**
 * 사용자 위치 조회 응답 인터페이스
 */
interface LocationResponse {
	authenticatedLocations: {
		id: number;
		representative: boolean; // 대표 여부
		addressInformation: {
			fullText: string;
			zipNo: string;
			sido: string;
			sigungu: string;
			dong: string;
			dongCd: string;
			x: string;
			y: string;
		};
	}[];
}

/**
 * 사용자 위치 조회
 *
 * @returns {Promise<LocationResponse>} 사용자 위치 응답
 */
const getUserLocation = async (): Promise<LocationResponse> => {
	// GET 요청으로 사용자 위치 정보를 가져옴
	const response = await apiClient.get<LocationResponse>('/user/location');
	return response.data;
};

export default getUserLocation;
