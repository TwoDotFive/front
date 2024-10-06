'use client';
import { useRouter } from 'next/navigation';
import { Text } from '../common/Text';
import { useEffect, useState } from 'react';
import getRoomList, { RoomInfo } from '@/api/chat/getChatList';
import { IconChat } from '@/public/icons';

interface ChatItem {
	name: string;
	lastMessage: string;
	time: string;
	unreadCount: number;
	imageSrc: string;
	awayName?: string;
	homeName?: string;
}

export default function ChatList() {
	const router = useRouter();

	const [chatList, setChatList] = useState<RoomInfo[]>([]);
	useEffect(() => {
		const fetchChatList = async () => {
			const response = await getRoomList();
			setChatList(response);
		};
		fetchChatList();
	}, []);

	return (
		<section className="overflow-y-scroll px-20pxr flex flex-col gap-24pxr">
			<div className="flex gap-8pxr">
				<div className="px-10pxr py-5pxr bg-primary rounded-44pxr">
					<Text fontSize={14} fontWeight={700} color="gray000">
						전체
					</Text>
				</div>
				<div className="px-10pxr py-5pxr bg-white border border-gray200 rounded-44pxr">
					<Text fontSize={14} fontWeight={400} color="gray600">
						모집중인 팬풀
					</Text>
				</div>
				<div className="px-10pxr py-5pxr bg-white border border-gray200 rounded-44pxr">
					<Text fontSize={14} fontWeight={400} color="gray600">
						신청한 팬풀
					</Text>
				</div>
			</div>

			{/* 채팅 리스트 렌더링 */}
			{chatList.length > 0 ? (
				chatList.map((chat, index) => (
					<div
						key={index}
						className="w-full flex justify-between items-center"
						onClick={() => router.push('/chat/1')}
					>
						<div className="w-full flex gap-8pxr">
							<img
								src={''}
								className="w-60pxr h-60pxr border border-gray100 rounded-full object-contain"
							/>
							<div className="w-full flex flex-col">
								<div className="flex justify-between">
									<Text fontSize={16} fontWeight={700} color="gray700">
										{'테스트'}
									</Text>
									<Text fontSize={12} fontWeight={500} color="gray700">
										{chat.teams}
									</Text>
								</div>
								<Text fontSize={14} fontWeight={400} color="gray600">
									{chat.lastMessage.content}
								</Text>
								<Text fontSize={14} fontWeight={400} color="gray600">
									{chat.lastMessage.time}
								</Text>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="flex flex-col items-center gap-4pxr mt-150pxr">
					<IconChat />
					<Text fontSize={12} fontWeight={500} color="gray400">
						앗 진행중인 채팅이 없어요!
					</Text>
				</div>
			)}
		</section>
	);
}
