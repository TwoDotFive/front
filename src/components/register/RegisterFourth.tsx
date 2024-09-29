import { Text } from '../common/Text';
import Button from '../common/Button';
import Image from 'next/image';

interface RegisterFourthProps {
	handleNext: () => void;
}

export const RegisterFourth = ({ handleNext }: RegisterFourthProps) => {
	return (
		<section className="mt-16pxr px-20pxr">
			<div className="flex flex-col items-center gap-4pxr">
				<div className="flex flex-col items-center mt-[20vh]">
					<Image
						src={'/images/image_register_success.png'}
						alt={''}
						width={106}
						height={106}
					/>
					<Text
						fontSize={18}
						fontWeight={700}
						color="gray700"
						className="mt-8pxr"
					>
						회원가입이 끝났어요!
						<Text fontSize={14} fontWeight={400} className="mt-2pxr">
							팬풀에 오신 것을 환영해요!
						</Text>
					</Text>
				</div>
				<div className="w-full absolute bottom-40pxr px-20pxr">
					<Button
						width="100%"
						height="50px"
						text={'팬풀 바로 시작'}
						borderRadius={8}
						enabledTextColor={'text-white'}
						enabledBackgroundColor={'bg-primary'}
						disabledTextColor={'text-gray300'}
						disabledBackgroundColor={'bg-gray100'}
						onClick={handleNext}
					/>
				</div>
			</div>
		</section>
	);
};
