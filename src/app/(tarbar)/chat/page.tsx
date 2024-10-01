import ChatList from '@/components/chat/ChatList';
import TapBar from '@/components/common/TapBar';

export default function page() {
	return (
		<main className="relative w-full flex flex-col">
			<TapBar text="채팅" type="mid" isNextButton={false} />
			<div className="h-18pxr" />
			<ChatList />
		</main>
	);
}
