'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FanpoolSubmitButton from './FanpoolSubmitButton';
import { FanpoolDateBottomSheet } from './FanpoolDateBottomSheet';
import { Text } from '../common/Text';
import { FanpoolMatchBottomSheet } from './FanpoolMatchBottomSheet';

interface FanpoolFormData {
	title: string;
	date: Date;
}

export default function FanpoolAddForm() {
	const { register, handleSubmit, setValue } = useForm<FanpoolFormData>();
	const [bottomSheet, setBottomSheet] = useState<{
		visible: boolean;
		type: 'date' | 'match' | null;
	}>({
		visible: false,
		type: null,
	});
	const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State to store selected date

	const onSubmit: SubmitHandler<FanpoolFormData> = (data) => {
		console.log('Submitted data:', data);
	};

	const handleDateSelect = (date: Date) => {
		setSelectedDate(date);
		setValue('date', date);
		setBottomSheet({ visible: false, type: null });
	};

	const openBottomSheet = (type: 'date' | 'match') => {
		setBottomSheet({ visible: true, type });
	};

	const closeBottomSheet = () => {
		setBottomSheet({ visible: false, type: null });
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
						onClick={() => openBottomSheet('date')}
					>
						<Text fontSize={14} fontWeight={400} color="gray400">
							{selectedDate
								? selectedDate.toLocaleDateString('ko-KR')
								: '언제 팬풀할 예정이세요?'}
						</Text>
					</div>
				</div>

				<div className="flex flex-col gap-8pxr">
					<Text fontSize={18} fontWeight={700} color="gray700">
						경기
					</Text>
					<div
						className="w-full h-full p-12pxr rounded-8pxr bg-kboBlue0 cursor-pointer text-center"
						onClick={() => openBottomSheet('match')}
					>
						<Text fontSize={16} fontWeight={500} color="kboBlue500">
							해당 날짜 경기 찾아보기
						</Text>
					</div>
				</div>

				<FanpoolSubmitButton />
			</form>

			<FanpoolDateBottomSheet
				isVisible={bottomSheet.visible && bottomSheet.type === 'date'}
				onClose={closeBottomSheet}
				onDateSelect={handleDateSelect}
			/>

			<FanpoolMatchBottomSheet
				isVisible={bottomSheet.visible && bottomSheet.type === 'match'}
				onClose={closeBottomSheet}
				onDateSelect={handleDateSelect}
			/>
		</>
	);
}
