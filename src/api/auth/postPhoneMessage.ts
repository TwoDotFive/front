import apiClient from '..';

/**
 * 휴대폰 번호를 받아서 인증 메시지를 전송하는 함수
 *
 * @param {string} phoneNumber 사용자의 휴대폰 번호
 * @returns {Promise<void>} 인증 메시지를 전송하고 별도의 응답을 받지 않음
 */
const postPhoneMessage = async (phoneNumber: string): Promise<void> => {
	try {
		// POST 요청을 보내기
		await apiClient.post('/auth/phone', {
			phoneNumber: phoneNumber,
		});
	} catch (error) {
		console.error('Error sending phone verification message:', error);
		throw error;
	}
};

export default postPhoneMessage;
