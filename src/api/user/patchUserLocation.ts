import apiClient from '..';

/**
 * 사용자 위치 패치
 *
 * @param {string} locationId 위치 ID
 * @returns {Promise<void>} 요청 성공 여부
 */
const patchUserLocation = async (locationId: string): Promise<void> => {
	await apiClient.patch(`/location/${locationId}`);
};

export default patchUserLocation;
