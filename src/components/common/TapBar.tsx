'use client';
import { IconLeftArrow, IconRightArrow, IconUpload } from '@/public/icons';
import { useRouter } from 'next/navigation';
import { Text } from './Text';

type TapBarProps = {
	text: string;
	isNextButton?: boolean;
	type: 'download' | 'left' | 'mid' | 'none';
};

export default function TapBar({
	text,
	isNextButton = false,
	type,
}: TapBarProps) {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	const handleNext = () => {
		router.forward();
	};

	const renderLeftSection = () => {
		if (type === 'mid') {
			return (
				<>
					<IconLeftArrow className="cursor-pointer" onClick={handleBack} />
					<Text fontSize={18} fontWeight={500} color="gray700">
						{text}
					</Text>
				</>
			);
		}

		return (
			<div className="flex items-center">
				<IconLeftArrow className="cursor-pointer" onClick={handleBack} />
				<Text
					fontSize={type === 'download' ? 16 : 18}
					fontWeight={type === 'download' ? 700 : 500}
					color="gray700"
					className="ml-4pxr"
				>
					{text}
				</Text>
			</div>
		);
	};

	const renderRightSection = () => {
		if (type === 'mid' && isNextButton) {
			return <IconRightArrow className="cursor-pointer" onClick={handleNext} />;
		}
		if (type === 'download') {
			return <IconUpload className="cursor-pointer" />;
		}
		return null;
	};

	if (type === 'none') {
		return (
			<Text fontSize={18} fontWeight={700} color="gray700" className="ml-12pxr">
				{text}
			</Text>
		);
	}

	return (
		<div
			className={`w-full h-49pxr flex items-center px-12pxr ${
				type !== 'left' ? 'justify-between' : ''
			}`}
		>
			{renderLeftSection()}
			{renderRightSection()}
		</div>
	);
}
