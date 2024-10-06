import apiClient from '..';

interface SendMessageRequest {
	roomId: string;
	message: {
		type: string;
		content: string;
	};
}

const postSendMessage = async (data: SendMessageRequest) => {
	const response = await apiClient.post(`/chat/send`, data);
	return response.data;
};

export default postSendMessage;
