import apiClient from '..';

/**
 * 사용자 차단 해제 요청 파라미터
 *
 * @param {string} targetUserId 차단 해제할 사용자 ID
 */
interface UnblockUserRequest {
	targetUserId: string;
}

/**
 * 사용자 차단 해제 요청
 *
 * @param {UnblockUserRequest} requestParameters 차단 해제할 사용자 ID를 포함한 요청 파라미터
 * @returns {Promise<void>} 성공 시 빈 응답
 */
const deleteUserBlock = async (
	requestParameters: UnblockUserRequest
): Promise<void> => {
	// DELETE 요청으로 targetUserId를 경로 파라미터로 전달
	await apiClient.delete(
		`/user/block?targetUserId=${requestParameters.targetUserId}`
	);
};

export default deleteUserBlock;
