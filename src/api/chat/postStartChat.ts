import apiClient from '..';

interface StartChatRequest {
	hostUserId: string;
	fanpoolId: string;
	message: {
		type: string;
		content: string;
	};
}

interface StartChatResponse {
	id: string;
}

const postStartChat = async (
	data: StartChatRequest
): Promise<StartChatResponse> => {
	const response = await apiClient.post<StartChatResponse>(`/chat/room`, data);
	return response.data;
};

export default postStartChat;
