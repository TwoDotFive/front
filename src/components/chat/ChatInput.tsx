import { IconPhotoAdd, IconSend } from '@/public/icons';
import { useState, useRef } from 'react';

interface ChatInputProps {
	onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
	const [input, setInput] = useState('');
	const isComposing = useRef(false); // 한글 조합 여부를 확인하는 ref

	const handleSend = () => {
		if (input.trim()) {
			onSend(input);
			setInput('');
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !isComposing.current) {
			handleSend();
		}
	};

	const handleCompositionStart = () => {
		isComposing.current = true; // 한글 조합이 시작되면 true
	};

	const handleCompositionEnd = () => {
		isComposing.current = false; // 한글 조합이 끝나면 false
	};

	return (
		<section className="absolute flex items-center gap-8pxr w-full h-60pxr bg-gray050 bottom-0 px-20pxr">
			<IconPhotoAdd />
			<input
				className="flex-grow px-10pxr h-38pxr rounded-30pxr border-1pxr border-gray100"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyPress}
				onCompositionStart={handleCompositionStart} // 한글 입력 시작 이벤트
				onCompositionEnd={handleCompositionEnd} // 한글 입력 완료 이벤트
				placeholder="메시지를 입력하세요"
			/>
			<IconSend onClick={handleSend} />
		</section>
	);
}
