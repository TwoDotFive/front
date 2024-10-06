import { IconPhotoAdd, IconSend } from '@/public/icons';
import { useState, useRef } from 'react';

interface ChatInputProps {
	onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
	const [input, setInput] = useState('');
	const isComposing = useRef(false);

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
		isComposing.current = true;
	};

	const handleCompositionEnd = () => {
		isComposing.current = false;
	};

	return (
		<section className="absolute flex items-center gap-8pxr w-full h-60pxr bg-gray050 bottom-0 px-20pxr">
			<IconPhotoAdd />
			<input
				className="flex-grow px-10pxr h-38pxr rounded-30pxr border-1pxr border-gray100"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyPress}
				onCompositionStart={handleCompositionStart}
				onCompositionEnd={handleCompositionEnd}
				placeholder="메시지를 입력하세요"
			/>
			<IconSend onClick={handleSend} />
		</section>
	);
}
