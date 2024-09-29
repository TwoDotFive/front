import apiClient from '..';

/**
 * 사용자 위치 삭제
 *
 * @param {string} locationId 삭제할 위치 ID
 * @returns {Promise<void>} 요청 성공 여부
 */
const deleteUserLocation = async (locationId: string): Promise<void> => {
	await apiClient.delete(`/user/location/${locationId}`);
};

export default deleteUserLocation;
