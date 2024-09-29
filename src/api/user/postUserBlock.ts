import apiClient from '..';

/**
 * 사용자 차단 요청 파라미터
 *
 * @param {string} targetUserId 차단할 사용자 ID
 */
interface BlockUserRequest {
	targetUserId: string;
}

/**
 * 사용자 차단 요청
 *
 * @param {BlockUserRequest} requestParameters 차단할 사용자 ID를 포함한 요청 파라미터
 * @returns {Promise<void>} 성공 시 빈 응답
 */
const postUserBlock = async (
	requestParameters: BlockUserRequest
): Promise<void> => {
	// POST 요청으로 targetUserId를 body에 전달
	await apiClient.post('/user/block', {
		targetUserId: requestParameters.targetUserId,
	});
};

export default postUserBlock;
