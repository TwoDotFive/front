'use client';
import React, { useState } from 'react';
import {
	format,
	isSameDay,
	isToday,
	getDay,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	subMonths,
	addMonths,
} from 'date-fns';
import BottomSheet from '../common/BottomSheet';
import { Text } from '../common/Text';
import { IconShiftLeft, IconShiftRight } from '@/public/icons';

interface FanpoolMatchBottomSheetProps {
	isVisible: boolean;
	onClose: () => void;
}

export const FanpoolMatchBottomSheet = ({
	isVisible,
	onClose,
}: FanpoolMatchBottomSheetProps) => {
	// 현재 월을 기준으로 캘린더를 설정
	const [localMonth, setLocalMonth] = useState<Date>(new Date());
	// 기본적으로 오늘 날짜를 선택
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const handlePrevMonth = () => {
		setLocalMonth(subMonths(localMonth, 1));
	};

	const handleNextMonth = () => {
		setLocalMonth(addMonths(localMonth, 1));
	};

	const handleDateSelect = (day: Date) => {
		setSelectedDate(day);
		console.log('선택한 날짜:', format(day, 'yyyy-MM-dd'));
		// onClose();
	};

	const renderDays = () => {
		const start = startOfMonth(localMonth);
		const end = endOfMonth(localMonth);
		const days = eachDayOfInterval({ start, end });

		// 달력 시작 전 비어있는 셀 추가
		const firstDayOfWeek = getDay(start);
		const emptyCells = Array.from({ length: firstDayOfWeek }, (_, index) => (
			<div key={`empty-${index}`} className="w-30pxr h-30pxr"></div>
		));

		return [
			...emptyCells,
			...days.map((day) => (
				<div
					key={day.toString()}
					onClick={() => handleDateSelect(day)}
					className={`flex items-center justify-center w-30pxr h-31pxr text-center cursor-pointer p-5pxr rounded-full ${
						selectedDate && isSameDay(day, selectedDate)
							? 'bg-kboBlue0'
							: 'bg-none'
					}`}
				>
					{isSameDay(day, selectedDate) || (isToday(day) && !selectedDate) ? (
						<Text fontSize={16} fontWeight={700} color="kboBlue500">
							{format(day, 'd')}
						</Text>
					) : (
						<Text fontSize={16} fontWeight={400} color="gray700">
							{format(day, 'd')}
						</Text>
					)}
				</div>
			)),
		];
	};

	// 요일 헤더 렌더링
	const renderWeekdays = () => {
		const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
		return weekdays.map((day, index) => (
			<div
				key={index}
				className="flex items-center justify-center w-30pxr h-30pxr text-center"
			>
				<Text fontSize={14} fontWeight={400} color="gray600">
					{day}
				</Text>
			</div>
		));
	};

	return (
		<BottomSheet isVisible={isVisible} onClose={onClose}>
			<section className="flex flex-col px-20pxr">
				<Text fontSize={16} fontWeight={700}>
					경기 날짜
				</Text>
				<div className="h-10pxr" />
				<div className="w-full flex justify-between items-center mb-8pxr">
					<div className="cursor-pointer" onClick={handlePrevMonth}>
						<IconShiftLeft />
					</div>
					<div className="flex flex-col items-center">
						<Text fontSize={16} fontWeight={700} color="gray700">
							{format(localMonth, 'M')}월
						</Text>
						<Text fontSize={12} fontWeight={400} color="gray500">
							{format(localMonth, 'yyyy')}년
						</Text>
					</div>
					<div className="cursor-pointer" onClick={handleNextMonth}>
						<IconShiftRight />
					</div>
				</div>
				<div className="grid grid-cols-7 gap-x-28pxr gap-y-24pxr w-full justify-center">
					{renderWeekdays()}
				</div>
				<div className="h-8pxr" />
				<div className="grid grid-cols-7 gap-x-28pxr gap-y-24pxr w-full justify-center">
					{renderDays()}
				</div>
			</section>
			<div className="h-40pxr" />
			<section className="flex items-center gap-4pxr px-20pxr">
				<Text fontSize={16} fontWeight={700}>
					경기({3})
				</Text>
			</section>
		</BottomSheet>
	);
};
