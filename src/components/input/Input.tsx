type InputProps = {
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
};

export default function Input({ placeholder, value, onChange }: InputProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return (
		<div className="w-full h-40pxr">
			<input
				type="text"
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				className="w-full h-full px-8pxr py-8pxr rounded-8pxr bg-gray050"
			/>
		</div>
	);
}
