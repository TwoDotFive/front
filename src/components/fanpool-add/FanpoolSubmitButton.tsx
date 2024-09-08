interface FanpoolSubmitButtonProps {
	isSubmitting?: boolean;
}

const FanpoolSubmitButton: React.FC<FanpoolSubmitButtonProps> = () => {
	return (
		<button
			type="submit"
			className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
		>
			제출
		</button>
	);
};

export default FanpoolSubmitButton;
