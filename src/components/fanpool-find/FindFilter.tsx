'use client';

import { useState } from 'react';
import { format, isToday } from 'date-fns';
import { Text } from '../common/Text';
import { IconFilter } from '@/public/icons';
import FilterBottomSheet from './FilterBottomSheet';
import { teams } from '@/constants/teams';

export default function FindFilter() {
	const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState<string>('');
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const toggleBottomSheet = () => {
		setIsBottomSheetVisible(!isBottomSheetVisible);
	};

	const handleTeamSelect = (code: string) => {
		setSelectedTeam(code);
	};

	const formatDate = (date: Date) => {
		return format(date, 'yy.MM.dd');
	};

	return (
		<div className="flex flex-col gap-8pxr">
			<div className="flex gap-8pxr">
				<div className="relative w-36pxr h-30pxr flex justify-center items-center rounded-4pxr cursor-pointer bg-white border border-gray200">
					<IconFilter onClick={toggleBottomSheet} />
				</div>
				<div
					className={`relative h-30pxr flex justify-center items-center rounded-4pxr px-10pxr cursor-pointer ${
						selectedTeam
							? 'bg-kboBlue0 border border-kboBlue400'
							: 'bg-white border border-gray200'
					}`}
					onClick={toggleBottomSheet}
				>
					<Text
						fontSize={14}
						fontWeight={700}
						color={selectedTeam ? 'kboBlue500' : 'gray600'}
						className="whitespace-nowrap text-center"
					>
						{selectedTeam
							? teams.find((team) => team.code === selectedTeam)?.name
							: '모든 팀'}
					</Text>
				</div>
				<div
					className={`relative h-30pxr flex justify-center items-center rounded-4pxr px-10pxr cursor-pointer ${
						selectedDate
							? 'bg-kboBlue0 border border-kboBlue400'
							: 'bg-white border border-gray200'
					}`}
					onClick={toggleBottomSheet}
				>
					<Text
						fontSize={14}
						fontWeight={700}
						color={selectedDate ? 'kboBlue500' : 'gray600'}
						className="whitespace-nowrap text-center"
					>
						{formatDate(selectedDate)}
					</Text>
				</div>
			</div>

			<FilterBottomSheet
				isVisible={isBottomSheetVisible}
				selectedTeam={selectedTeam}
				selectedDate={selectedDate}
				currentMonth={selectedDate}
				onClose={toggleBottomSheet}
				onTeamSelect={handleTeamSelect}
				onDateSelect={setSelectedDate}
			/>
		</div>
	);
}
