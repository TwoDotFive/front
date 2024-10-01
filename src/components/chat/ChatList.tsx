'use client';
import { useRouter } from 'next/navigation';
import { Text } from '../common/Text';

interface ChatItem {
	name: string;
	lastMessage: string;
	time: string;
	unreadCount: number;
	imageSrc: string;
}

export default function ChatList() {
	const router = useRouter();
	const chatItems: ChatItem[] = [
		{
			name: '승요승요',
			lastMessage: '저 하고싶어요',
			time: '지금',
			unreadCount: 1,
			imageSrc: '/images/kia.png',
		},
		{
			name: '김동철',
			lastMessage: '아 언제 보실래용?',
			time: '16분전',
			unreadCount: 1,
			imageSrc: '/images/empty_image_place.png',
		},
		{
			name: '배선미',
			lastMessage: '너무 배고파요',
			time: '오후 12:03',
			unreadCount: 1,
			imageSrc: '/images/default_profile.png',
		},
		{
			name: '배성준',
			lastMessage: '곧 도착합니다',
			time: '3일전',
			unreadCount: 1,
			imageSrc: '/images/doosan.png',
		},
	];

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
			{chatItems.map((chat, index) => (
				<div
					key={index}
					className="flex justify-between items-center"
					onClick={() => router.push('/chat/1')}
				>
					<div className="flex gap-8pxr">
						<img
							src={chat.imageSrc}
							className="w-60pxr h-60pxr border border-gray100 rounded-full object-contain"
						/>
						<div className="flex flex-col">
							<Text fontSize={16} fontWeight={700} color="gray700">
								{chat.name}
							</Text>
							<Text fontSize={14} fontWeight={400} color="gray600">
								{chat.lastMessage}
							</Text>
							<Text fontSize={14} fontWeight={400} color="gray600">
								{chat.time}
							</Text>
						</div>
					</div>
					<div className="flex items-center justify-center w-18pxr h-18pxr rounded-full bg-kboNavy">
						<Text fontSize={14} fontWeight={700} color="gray000">
							{chat.unreadCount}
						</Text>
					</div>
				</div>
			))}
		</section>
	);
}
