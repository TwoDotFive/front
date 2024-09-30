'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IconLeftArrow } from '@/public/icons';
import { Text } from '../common/Text';
import { RegisterFirst } from './RegisterFirst';
import { RegisterSecond } from './RegisterSecond';
import { RegisterThird } from './RegisterThird';
import { RegisterFourth } from './RegisterFourth';
import { useRouter } from 'next/navigation';

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export default function RegisterSection() {
	const [currentStep, setCurrentStep] = useState<number>(1);
	const router = useRouter();

	const { register, handleSubmit, setValue, getValues } = useForm<FormData>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
	});

	const handleNext = (): void => {
		setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
	};

	const handlePrev = (): void => {
		if (currentStep === 1) {
			router.back();
		}
		setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
	};

	const onSubmit: SubmitHandler<FormData> = (data) => {
		// TODO : 회원가입
	};

	const renderStepContent = (): JSX.Element => {
		switch (currentStep) {
			case 1:
				return (
					<RegisterFirst
						register={register}
						handleNext={handleNext}
						getValues={getValues}
					/>
				);
			case 2:
				return (
					<RegisterSecond
						register={register}
						handleNext={handleNext}
						setValue={setValue}
						getValues={getValues}
					/>
				);
			case 3:
				return (
					<RegisterThird
						register={register}
						handleNext={handleNext}
						setValue={setValue}
						getValues={getValues}
						handleSubmit={handleSubmit(onSubmit)}
					/>
				);
			case 4:
				return <RegisterFourth handleNext={() => router.push('/home')} />;
			default:
				return (
					<RegisterFirst
						register={register}
						handleNext={handleNext}
						getValues={getValues}
					/>
				);
		}
	};

	return (
		<section className="relative h-full">
			<div className="w-full h-49pxr flex items-center px-12pxr justify-between">
				<IconLeftArrow className="cursor-pointer" onClick={handlePrev} />
				{currentStep === 4 ? (
					<Text fontSize={18} fontWeight={500} color="gray700">
						회원가입 완료
					</Text>
				) : (
					<Text fontSize={18} fontWeight={500} color="gray700">
						회원가입
					</Text>
				)}
				<div className="w-25pxr h-24pxr" />
			</div>
			{renderStepContent()}
		</section>
	);
}
