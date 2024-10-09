import apiClient from '..';

/**
 * 팬풀 삭제 함수
 *
 * @param {string | BigInt} fanpoolId 팬풀 고유 ID (필수)
 *
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
const deleteFanpool = async (fanpoolId: string | BigInt): Promise<boolean> => {
	try {
		await apiClient.delete(`/fanpool/${fanpoolId}`);
		return true; // 삭제 성공 시 true 반환
	} catch (error) {
		console.error('Failed to delete fanpool:', error);
		return false; // 삭제 실패 시 false 반환
	}
};

export default deleteFanpool;
