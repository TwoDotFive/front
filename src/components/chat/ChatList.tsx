'use client';
import { useRouter } from 'next/navigation';
import { Text } from '../common/Text';
import { useEffect, useState } from 'react';
import getRoomList, { RoomInfo } from '@/api/chat/getChatList';
import { IconChat } from '@/public/icons';

export default function ChatList() {
	const router = useRouter();

	const [chatList, setChatList] = useState<RoomInfo[]>([]);

	const [filteredChatList, setFilteredChatList] = useState<RoomInfo[]>([]);

	const [filter, setFilter] = useState<'all' | 'host' | 'participant'>('all');

	useEffect(() => {
		const fetchChatList = async () => {
			const response = await getRoomList();
			setChatList(response);
			setFilteredChatList(response);
		};
		fetchChatList();
	}, []);

	useEffect(() => {
		if (filter === 'all') {
			setFilteredChatList(chatList);
		} else if (filter === 'host') {
			setFilteredChatList(chatList.filter((chat) => chat.isHost));
		} else if (filter === 'participant') {
			setFilteredChatList(chatList.filter((chat) => !chat.isHost));
		}
	}, [filter, chatList]);

	const formatTime = (timeString: string) => {
		if (timeString === null) return '';
		const lastMessageTime = new Date(timeString).getTime();
		const currentTime = Date.now();
		const timeDifference = currentTime - lastMessageTime;
		const minutes = Math.floor(timeDifference / (1000 * 60));
		const hours = Math.floor(timeDifference / (1000 * 60 * 60));
		const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

		if (minutes < 60) {
			return `${minutes}분 전`;
		} else if (hours < 24) {
			return `${hours}시간 전`;
		} else {
			return `${days}일 전`;
		}
	};

	return (
		<section className="overflow-y-scroll px-20pxr flex flex-col gap-24pxr">
			<div className="flex gap-8pxr">
				<div
					className={`px-10pxr cursor-pointer py-5pxr rounded-44pxr ${
						filter === 'all' ? 'bg-primary' : 'bg-white border border-gray200'
					}`}
					onClick={() => setFilter('all')}
				>
					<Text
						fontSize={14}
						fontWeight={700}
						color={filter === 'all' ? 'gray000' : 'gray600'}
					>
						전체
					</Text>
				</div>
				<div
					className={`px-10pxr cursor-pointer py-5pxr rounded-44pxr ${
						filter === 'host' ? 'bg-primary' : 'bg-white border border-gray200'
					}`}
					onClick={() => setFilter('host')}
				>
					<Text
						fontSize={14}
						fontWeight={700}
						color={filter === 'host' ? 'gray000' : 'gray600'}
					>
						모집중인 팬풀
					</Text>
				</div>
				<div
					className={`px-10pxr cursor-pointer py-5pxr rounded-44pxr ${
						filter === 'participant'
							? 'bg-primary'
							: 'bg-white border border-gray200'
					}`}
					onClick={() => setFilter('participant')}
				>
					<Text
						fontSize={14}
						fontWeight={700}
						color={filter === 'participant' ? 'gray000' : 'gray600'}
					>
						신청한 팬풀
					</Text>
				</div>
			</div>

			{/* 채팅 리스트 렌더링 */}
			{filteredChatList.length > 0 ? (
				filteredChatList.map((chat, index) => (
					<div
						key={index}
						className="w-full flex justify-between items-center"
						onClick={() => {
							localStorage.setItem('otherId', chat.partner.id);
							localStorage.setItem('fanpoolId', chat.fanpoolId);
							router.push(`/chat/${chat.roomId}`);
						}}
					>
						<div className="w-full flex gap-8pxr">
							<img
								src={''}
								className="w-60pxr h-60pxr border border-gray100 rounded-full object-contain"
							/>
							<div className="w-full flex flex-col">
								<div className="flex justify-between">
									<Text fontSize={16} fontWeight={700} color="gray700">
										{chat.partner.nickname}
									</Text>
									<Text fontSize={12} fontWeight={500} color="gray700">
										{chat.teams}
									</Text>
								</div>
								<Text fontSize={14} fontWeight={400} color="gray600">
									{chat.lastMessage.content}
								</Text>
								<Text fontSize={14} fontWeight={400} color="gray600">
									{formatTime(chat.lastMessage.time)}
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
