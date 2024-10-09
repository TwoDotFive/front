import apiClient from '..';

export interface RoomInfo {
	roomId: string;
	fanpoolId: string;
	isHost: boolean;
	lastActivityTime: string;
	partner: {
		id: string;
		nickname: string;
		image: string;
	};
	teams: string;
	lastMessage: {
		content: string;
		time: string;
	};
}
const getRoomList = async (): Promise<RoomInfo[]> => {
	const response = await apiClient.get<RoomInfo[]>(`/chat/room`);
	return response.data;
};

export default getRoomList;
