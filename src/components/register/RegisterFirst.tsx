import React, { useState, useEffect } from 'react';
import {
	UseFormRegister,
	UseFormSetValue,
	UseFormGetValues,
} from 'react-hook-form';
import { Text } from '../common/Text';
import Button from '../common/Button';
import postPhoneMessage from '@/api/auth/postPhoneMessage';
import postPhoneVerify from '@/api/auth/postPhoneVerify'; // postPhoneVerify 임포트

interface RegisterFirstProps {
	register: UseFormRegister<any>;
	handleNext: () => void;
	getValues: UseFormGetValues<any>;
}

export const RegisterFirst = ({
	register,
	handleNext,
	getValues,
}: RegisterFirstProps) => {
	const [isVerificationSent, setIsVerificationSent] = useState(false);
	const [phoneNumberError, setPhoneNumberError] = useState('');
	const [verificationCodeError, setVerificationCodeError] = useState('');
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const [verificationCode, setVerificationCode] = useState('');

	const validatePhoneNumber = (phone: string) => {
		const phoneRegex = /^010\d{8}$/;
		return phoneRegex.test(phone);
	};

	const handleVerification = async () => {
		const phoneNumber = getValues('phoneNumber');
		if (!validatePhoneNumber(phoneNumber)) {
			setPhoneNumberError('올바른 형식의 전화번호가 아니에요.');
		} else {
			setPhoneNumberError('');
			try {
				await postPhoneMessage(phoneNumber);
				setIsVerificationSent(true);
			} catch (error) {
				console.error('Error sending phone verification message:', error);
				setPhoneNumberError('인증 메시지 전송 중 오류가 발생했습니다.');
			}
		}
	};

	const handleCodeVerification = async () => {
		const phoneNumber = getValues('phoneNumber');
		const code = getValues('verificationCode');
		try {
			await postPhoneVerify(phoneNumber, code);
			handleNext();
		} catch (error: any) {
			if (error.response && error.response.status === 400) {
				setVerificationCodeError(error.response.data.message);
			} else {
				setVerificationCodeError('인증 코드 확인 중 오류가 발생했습니다.');
			}
		}
	};

	useEffect(() => {
		if (verificationCode.length > 0) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [verificationCode]);

	return (
		<section className="mt-16pxr px-20pxr">
			<div className="flex flex-col gap-4pxr">
				<Text fontSize={18} fontWeight={700} color="kboNavy">
					<Text
						fontSize={24}
						fontWeight={700}
						color="kboNavy"
						className="inline-block"
					>
						1
					</Text>
					/3
				</Text>
				<Text fontSize={18} fontWeight={700}>
					더 쾌적하고 안전한 사용을 위해
					<br />
					휴대폰 인증을 진행해요
				</Text>
			</div>
			<div className="flex flex-col gap-8pxr mt-88pxr">
				<Text fontSize={16} fontWeight={600}>
					휴대폰 번호
				</Text>
				<div className="relative w-full h-40pxr">
					<input
						type="text"
						placeholder="'-'없이 휴대폰 번호를 입력해주세요"
						{...register('phoneNumber')}
						className="w-full h-full px-8pxr py-8pxr rounded-8pxr bg-gray050 placeholder:text-gray300 text-sm"
					/>
					<div className="absolute right-12pxr top-1/2 transform -translate-y-1/2 flex items-center">
						<Text
							fontSize={16}
							fontWeight={600}
							color="kboBlue500"
							className="cursor-pointer"
							onClick={handleVerification}
						>
							인증
						</Text>
					</div>
				</div>
				{phoneNumberError && (
					<Text fontSize={14} fontWeight={500} color="fireRed400">
						{phoneNumberError}
					</Text>
				)}
				{isVerificationSent && (
					<Text fontSize={14} fontWeight={500} color="kboBlue500">
						인증번호가 적힌 문자가 전송되었어요.
					</Text>
				)}
			</div>

			{isVerificationSent && (
				<div className="flex flex-col gap-8pxr mt-24pxr">
					<Text fontSize={16} fontWeight={600}>
						인증번호
					</Text>
					<div className="w-full h-40pxr">
						<input
							type="text"
							placeholder="문자로 온 인증번호를 입력해주세요"
							{...register('verificationCode')}
							value={verificationCode}
							onChange={(e) => setVerificationCode(e.target.value)}
							className="w-full h-full px-8pxr py-8pxr rounded-8pxr bg-gray050 placeholder:text-gray300 text-sm"
						/>
					</div>
					{verificationCodeError && (
						<Text fontSize={14} fontWeight={500} color="fireRed400">
							{verificationCodeError}
						</Text>
					)}
					<Text
						fontSize={14}
						fontWeight={400}
						color="gray600"
						className="text-center"
					>
						인증번호 재전송
					</Text>
				</div>
			)}

			<div className="max-w-399pxr w-full fixed bottom-40pxr left-1/2 -translate-x-1/2 right-0 px-20pxr">
				<Button
					width="100%"
					height="50px"
					text={'다음'}
					borderRadius={8}
					disabled={isButtonDisabled}
					enabledTextColor={'text-white'}
					enabledBackgroundColor={'bg-primary'}
					disabledTextColor={'text-gray300'}
					disabledBackgroundColor={'bg-gray100'}
					onClick={handleCodeVerification}
				/>
			</div>
		</section>
	);
};
