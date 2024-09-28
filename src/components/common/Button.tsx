'use client';
import { Text } from './Text';

/**
 * ButtonProps 인터페이스
 *
 * @interface ButtonProps
 * @param {string} text 버튼 텍스트
 * @param {string} width 버튼 너비 (px, %)
 * @param {string} height 버튼 높이 (px, %)
 * @param {number} fontSize 버튼 폰트 크기 (px)
 * @param {number} fontWeight 버튼 폰트 굵기
 * @param {number} borderRadius 버튼 테두리 반지름 (px)
 * @param {string} enabledTextColor 활성화된 텍스트 색상
 * @param {string} enabledBackgroundColor 활성화된 배경 색상
 * @param {string} disabledTextColor 비활성화된 텍스트 색상
 * @param {string} disabledBackgroundColor 비활성화된 배경 색상
 * @param {boolean} disabled 비활성화 여부
 * @param {() => void} onClick 클릭 이벤트 함수
 */
interface ButtonProps {
	text: string;
	width?: string;
	height?: string;
	fontSize?: number;
	fontWeight?: number;
	borderRadius: number;
	enabledTextColor: string;
	enabledBackgroundColor: string;
	disabledTextColor?: string;
	disabledBackgroundColor?: string;
	disabled?: boolean;
	isHover?: boolean;
	onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button 컴포넌트
 *
 * @Component Button
 * @param {ButtonProps} props ButtonProps 인터페이스
 */
const Button = ({
	text,
	width = '100%',
	height = '100%',
	fontSize = 16,
	fontWeight = 400,
	borderRadius = 8,
	enabledTextColor,
	enabledBackgroundColor,
	disabledTextColor,
	disabledBackgroundColor,
	disabled,
	onClick,
}: ButtonProps) => {
	return (
		<button
			className={`transition duration-200 select-none ${
				disabled
					? `cursor-not-allowed ${disabledTextColor} ${disabledBackgroundColor}`
					: `hover:brightness-75 ${enabledTextColor} ${enabledBackgroundColor}`
			}`}
			style={{ width, height, borderRadius }}
			disabled={disabled}
			onClick={onClick}
		>
			<Text fontSize={fontSize} fontWeight={fontWeight}>
				{text}
			</Text>
		</button>
	);
};

export default Button;
