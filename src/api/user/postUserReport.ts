import apiClient from '..';

/**
 * 사용자 신고 요청 파라미터
 *
 * @param {string} targetUserId 신고할 사용자 ID
 * @param {string} content 신고 내용
 */
interface ReportUserRequest {
	targetUserId: string;
	content: string;
}

/**
 * 사용자 신고 요청
 *
 * @param {ReportUserRequest} requestParameters
 * @returns {Promise<void>}
 */
const postUserReport = async (
	requestParameters: ReportUserRequest
): Promise<void> => {
	// POST 요청으로 targetUserId와 content를 body에 전달
	await apiClient.post('/user/report', {
		targetUserId: requestParameters.targetUserId,
		content: requestParameters.content,
	});
};

export default postUserReport;
