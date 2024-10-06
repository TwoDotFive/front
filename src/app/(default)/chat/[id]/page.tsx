import ChatContent from '@/components/chat/ChatContent';
import InfinityLine from '@/components/common/InfinityLine';
import ChatTapBar from '@/components/common/tapbar/chatTapBar';

export default function page({ params }: { params?: { id?: string } }) {
	return (
		<section className="flex flex-col h-full">
			<ChatTapBar />
			<InfinityLine color="bg-gray100" thickness="h-1pxr" />

			<div className="flex-grow">
				<ChatContent />
			</div>
		</section>
	);
}
