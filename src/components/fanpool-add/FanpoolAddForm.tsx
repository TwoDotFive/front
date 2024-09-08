'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FanpoolSubmitButton from './FanpoolSubmitButton';
import FanpoolDateBottomSheet from './FanpoolDateBottomSheet';
import { Text } from '../common/Text';

interface FanpoolFormData {
	title: string;
	date: Date;
}

export default function FanpoolAddForm() {
	const { register, handleSubmit, setValue } = useForm<FanpoolFormData>(); // Include setValue to update the form
	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false); // State for bottom sheet visibility
	const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State to store selected date

	const onSubmit: SubmitHandler<FanpoolFormData> = (data) => {
		console.log('Submitted data:', data);
	};

	const handleDateSelect = (date: Date) => {
		setSelectedDate(date);
		setValue('date', date);
		setIsDatePickerVisible(false);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-40pxr px-20pxr pt-17pxr"
			>
				<div className="flex flex-col gap-8pxr">
					<Text fontSize={18} fontWeight={700} color="gray700">
						제목
					</Text>
					<input
						type="text"
						placeholder="제목을 입력해주세요"
						{...register('title', { required: '제목을 입력해주세요' })}
						className="w-full h-full p-12pxr rounded-8pxr bg-gray050 placeholder:text-gray400 text-sm"
					/>
				</div>

				<div className="flex flex-col gap-8pxr">
					<Text fontSize={18} fontWeight={700} color="gray700">
						팬풀 날짜
					</Text>
					<div
						className="w-full h-full p-12pxr rounded-8pxr bg-gray050 cursor-pointer"
						onClick={() => setIsDatePickerVisible(true)}
					>
						<Text fontSize={14} fontWeight={400} color="gray400">
							{selectedDate
								? selectedDate.toLocaleDateString('ko-KR')
								: '언제 팬풀할 예정이세요?'}
						</Text>
					</div>
				</div>

				<FanpoolSubmitButton />
			</form>

			<FanpoolDateBottomSheet
				isVisible={isDatePickerVisible}
				onClose={() => setIsDatePickerVisible(false)}
				onDateSelect={handleDateSelect}
			/>
		</>
	);
}
