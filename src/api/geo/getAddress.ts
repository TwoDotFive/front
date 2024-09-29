import apiClient from '..';

/**
 * 주소 정보를 반환하는 인터페이스
 */
interface AddressResponse {
	fullText: string; // 주소 전체
	x: string; // 경도
	y: string; // 위도
	zipNo: string; // 우편번호
	sido: string; // 시도
	sigungu: string; // 시군구 및 도로명 주소
	dong: string; // 동 이름
	dongCd: string; // 행정동 코드 (8자리)
}

/**
 * 좌표를 통해 주소 정보를 가져오는 함수
 *
 * @param {number} x 경도
 * @param {number} y 위도
 * @returns {Promise<AddressResponse>} 주소 정보 응답
 */
const getAddress = async (x: number, y: number): Promise<AddressResponse> => {
	const response = await apiClient.get<AddressResponse>(
		`/geo/coord2address?x=${x}&y=${y}` // 예시 URL 경로, 실제 API 경로에 맞춰 수정 필요
	);
	return response.data;
};

export default getAddress;
