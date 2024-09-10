import Button from '../common/Button';

interface FanpoolSubmitButtonProps {
	isSubmitting?: boolean;
}

export const FanpoolSubmitButton = ({
	isSubmitting,
}: FanpoolSubmitButtonProps) => {
	return (
		<div className="fixed bottom-20pxr left-0 right-0 px-20pxr">
			<Button
				width="100%"
				height="50px"
				text={'팬풀 등록하기'}
				borderRadius={8}
				disabled={!isSubmitting}
				enabledTextColor={'text-white'}
				enabledBackgroundColor={'bg-primary'}
				disabledTextColor={'text-gray300'}
				disabledBackgroundColor={'bg-gray100'}
				onClick={() => {}}
			/>
		</div>
	);
};
