interface InfinityLineProps {
	color?: string;
	thickness?: string;
	marginTop?: string;
	marginBottom?: string;
}

export default function InfinityLine({
	color,
	thickness,
	marginTop,
	marginBottom,
}: InfinityLineProps) {
	return (
		<div
			className={`${color} ${thickness} w-full ${marginTop} ${marginBottom}`}
		/>
	);
}
