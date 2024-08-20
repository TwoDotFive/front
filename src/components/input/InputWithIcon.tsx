import { IconDefaultPin } from '@/public/icons';

type InputWithIconProps = {
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
};

export default function InputWithIcon({
	placeholder,
	value,
	onChange,
}: InputWithIconProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return (
		<div className="relative w-full h-40pxr">
			<IconDefaultPin className="absolute left-8pxr top-1/2 transform -translate-y-1/2" />
			<input
				type="text"
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				className="w-full h-full pl-40pxr pr-8pxr py-8pxr rounded-8pxr bg-gray050"
			/>
		</div>
	);
}
