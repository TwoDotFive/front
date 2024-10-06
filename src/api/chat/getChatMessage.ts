import apiClient from '..';

export interface ChatMessage {
	id: string;
	type: string;
	content: string;
	time: string;
	senderId: string;
}

interface GetChatMessageParams {
	roomId: string;
	lastId?: string; // 선택적 파라미터
	size?: number; // 선택적 파라미터
}

const getChatMessage = async ({
	roomId,
	lastId,
	size = 30,
}: GetChatMessageParams): Promise<ChatMessage[]> => {
	const response = await apiClient.get<ChatMessage[]>(
		`/chat/room/${roomId}/message`,
		{
			params: {
				lastId,
				size,
			},
		}
	);
	return response.data;
};

export default getChatMessage;
