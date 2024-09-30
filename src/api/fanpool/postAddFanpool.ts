import apiClient from '..';

/**
 * 출발지 주소 정보
 */
interface AddressResponse {
	fullText: string; // 전체 주소 텍스트
	zipNo: string; // 우편번호
	sido: string; // 시도
	sigungu: string; // 시군구 및 도로명 주소
	dong: string; // 동 이름
	dongCd: string; // 행정동 코드
	x: string; // 경도
	y: string; // 위도
}

/**
 * 팬풀 추가 요청 파라미터
 */
interface AddFanpoolRequest {
	departAt: string; // 출발 시간 (ISO 8601 형식)
	gameId: string; // 경기 ID
	numberOfPeople: number; // 모집 인원 수
	memo?: string; // 메모 (선택 사항)
	fanpoolType: string; // 팬풀 유형
	genderConstraint: string; // 성별 제한 (예: '남자만', '여자만', '성별무관')
	departFrom: AddressResponse; // 출발지 정보
}

/**
 * 팬풀 추가 요청
 *
 * @param {AddFanpoolRequest} requestParameters 팬풀 생성에 필요한 요청 파라미터
 * @returns {Promise<void>} 성공 시 빈 응답
 */
const postAddFanpool = async (
	requestParameters: AddFanpoolRequest
): Promise<void> => {
	// POST 요청으로 팬풀 정보를 body에 전달
	await apiClient.post('/fanpool', {
		departAt: requestParameters.departAt,
		gameId: requestParameters.gameId,
		numberOfPeople: requestParameters.numberOfPeople,
		memo: requestParameters.memo,
		fanpoolType: requestParameters.fanpoolType,
		genderConstraint: requestParameters.genderConstraint,
		departFrom: requestParameters.departFrom,
	});
};

export default postAddFanpool;
