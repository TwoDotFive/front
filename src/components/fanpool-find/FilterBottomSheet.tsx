'use client';

import { useState } from 'react';
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
import { teams } from '@/constants/teams';
import SelectTeamNameButton from '../common/button/SelectTeamNameButton';
import { IconShiftLeft, IconShiftRight } from '@/public/icons';
import InfinityLine from '../common/InfinityLine';

interface FilterBottomSheetProps {
	isVisible: boolean;
	selectedTeam: number;
	selectedDate: Date;
	currentMonth: Date;
	onClose: () => void;
	onTeamSelect: (id: number) => void;
	onDateSelect: (date: Date) => void;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
	isVisible,
	selectedTeam,
	selectedDate,
	currentMonth,
	onClose,
	onTeamSelect,
	onDateSelect,
}) => {
	const [localMonth, setLocalMonth] = useState(currentMonth);

	const handlePrevMonth = () => {
		setLocalMonth(subMonths(localMonth, 1));
	};

	const handleNextMonth = () => {
		setLocalMonth(addMonths(localMonth, 1));
	};

	const getFormattedDate = () => {
		const monthDay = `${format(selectedDate, 'M')}월${format(
			selectedDate,
			'd'
		)}일`;
		return isToday(selectedDate) ? `${monthDay}(오늘)` : monthDay;
	};

	const renderDays = () => {
		const start = startOfMonth(localMonth);
		const end = endOfMonth(localMonth);
		const days = eachDayOfInterval({ start, end });

		const firstDayOfWeek = getDay(start);

		const emptyCells = Array.from({ length: firstDayOfWeek }, (_, index) => (
			<div key={`empty-${index}`} className="w-30pxr h-30pxr"></div>
		));

		return [
			...emptyCells,
			...days.map((day) => (
				<div
					key={day.toString()}
					onClick={() => onDateSelect(day)}
					className={`flex items-center justify-center w-30pxr h-31spxr text-center cursor-pointer p-5pxr rounded-full ${
						selectedDate && isSameDay(day, selectedDate)
							? 'bg-kboBlue0'
							: 'bg-none'
					}`}
				>
					{selectedDate && isSameDay(day, selectedDate) ? (
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
			<section className="flex flex-col">
				<Text fontSize={16} fontWeight={700}>
					경기팀
				</Text>
				<div className="h-10pxr" />

				<div className="flex flex-wrap gap-8pxr">
					<SelectTeamNameButton
						code=""
						isSelected={selectedTeam === 0}
						onClick={() => onTeamSelect(0)}
					/>
					{teams.map((team) => (
						<SelectTeamNameButton
							key={team.code}
							code={team.code}
							isSelected={selectedTeam === team.id}
							onClick={() => onTeamSelect(team.id)}
						/>
					))}
				</div>
			</section>
			<div className="h-40pxr" />
			<section className="flex flex-col">
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
			<div className="h-8pxr" />
			<InfinityLine color="bg-gray200" thickness="h-1pxr" />
			<div className="h-20pxr" />
			<div className="relative w-fit h-fit flex justify-center items-center rounded-4pxr px-10pxr py-4pxr cursor-pointer bg-kboBlue0 border border-kboBlue400">
				<Text
					fontSize={14}
					fontWeight={700}
					color="kboBlue500"
					className="whitespace-nowrap text-center"
				>
					{getFormattedDate()}
				</Text>
			</div>
			<div className="h-32pxr" />
			<div
				className="w-full py-11pxr px-14pxr bg-primary rounded-8pxr text-center cursor-pointer"
				onClick={onClose}
			>
				<Text fontSize={16} fontWeight={600} color="white">
					선택 완료
				</Text>
			</div>
		</BottomSheet>
	);
};

export default FilterBottomSheet;
