import apiClient from '..';

/**
 * 사용자 위치 정보를 담고 있는 인터페이스
 */
interface LocationRequest {
	representative: boolean; // 대표 여부
	x: string; // 경도
	y: string; // 위도
	fullText: string; // 주소 전체
	zipNo: string; // 우편번호
	sido: string; // 시도
	sigungu: string; // 시군구 및 도로명 주소
	dong: string; // 동 이름
	dongCd: string; // 행정동 코드
}

/**
 * 사용자 위치 정보를 전송하는 함수
 *
 * @param {LocationRequest} locationData 사용자 위치 정보
 * @returns {Promise<void>} 위치 정보를 전송하고 별도의 응답을 받지 않음
 */
const postUserLocation = async (
	locationData: LocationRequest
): Promise<void> => {
	try {
		// POST 요청을 보내기
		await apiClient.post('/user/location', locationData);
	} catch (error) {
		console.error('Error sending user location:', error);
		throw error;
	}
};

export default postUserLocation;
