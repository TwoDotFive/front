import ChatContent from '@/components/chat/ChatContent';
import InfinityLine from '@/components/common/InfinityLine';
import ChatTapBar from '@/components/common/tapbar/chatTapBar';

export default function page() {
	return (
		<section className="flex flex-col h-full">
			<ChatTapBar
				text={'네임드호빵'}
				team={'kiwoom'}
				fanpoolCount={4}
				fanpoolLogCount={1}
			/>
			<InfinityLine color="bg-gray100" thickness="h-1pxr" />

			<div className="flex-grow">
				<ChatContent />
			</div>
		</section>
	);
}
