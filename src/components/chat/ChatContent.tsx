'use client';
import { useEffect, useState } from 'react';
import getChatMessage from '@/api/chat/getChatMessage';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import postSendMessage from '@/api/chat/postSendMessage';
import { Text } from '../common/Text';
import ChatGameInfo from './ChatGameInfo';

interface Message {
	id: string;
	content: string;
	time: string;
	type: string;
	senderId: string;
}

export default function ChatContent({ roomId }: { roomId: string }) {
	const [messages, setMessages] = useState<Message[]>([]);
	useEffect(() => {
		const fetchChatMessages = async () => {
			try {
				const response = await getChatMessage({
					roomId: roomId,
				});
				setMessages(response);
			} catch (err) {
				console.error(err);
			}
		};

		fetchChatMessages();
	}, [roomId]);

	const handleSendMessage = async (message: string) => {
		const newMessage = {
			id: localStorage.getItem('userId')!,
			content: message,
			time: new Date().toString(),
			type: 'TEXT',
			senderId: localStorage.getItem('userId')!,
		};

		try {
			await postSendMessage({
				roomId: roomId,
				message: {
					type: newMessage.type,
					content: newMessage.content,
				},
			});
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		} catch (error) {
			console.error('Failed to send message:', error);
		}
	};
	return (
		<section className="w-full h-full flex flex-col">
			<ChatGameInfo />
			<div className="h-16pxr" />
			<div className="flex flex-col">
				<section className="py-8pxr px-35pxr bg-gray050">
					<Text fontSize={12} fontWeight={400} color="gray500">
						팬풀은 서로가 신뢰할 수 있는 커뮤니티를 만들어가고 있어요. 개인 정보
						요구, 외부 채팅방으로 유도하는 경우 주의해 주세요.
					</Text>
				</section>
				<div className="h-24pxr" />
				<ChatMessageList messages={messages} />
				<ChatInput onSend={handleSendMessage} />
			</div>
		</section>
	);
}
