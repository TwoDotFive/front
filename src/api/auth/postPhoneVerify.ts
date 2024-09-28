import apiClient from '..';

/**
 * 휴대폰 번호를 받아서 인증 메시지를 전송하는 함수
 *
 * @param {string} phoneNumber
 * @returns {Promise<void>} 인증 메시지를 전송하고 별도의 응답을 받지 않음
 */
const postPhoneMessage = async (
	phoneNumber: string,
	code: string
): Promise<void> => {
	const response = await apiClient.post('/auth/phone/verify', {
		phoneNumber: phoneNumber,
		code: code,
	});
	return response.data;
};

export default postPhoneMessage;
