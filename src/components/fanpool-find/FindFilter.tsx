'use client';

import { useState } from 'react';
import { format, isToday } from 'date-fns';
import { Text } from '../common/Text';
import { IconCheckNavy, IconFilter } from '@/public/icons';
import FilterBottomSheet from './FilterBottomSheet';
import { teams } from '@/constants/teams';
import InputWithIcon from '../common/input/InputWithIcon';
import FanpoolMatchSelectButton from '../common/fanpool/FanpoolMatchSelectButton';
import MatchSelectBottomSheet from './MatchSelectBottomSheet';

export default function FindFilter() {
	const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState<string>('');
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const [isMatchSelectBottomSheetVisible, setIsMatchSelectBottomSheetVisible] =
		useState(false);
	const [selectedMatch, setSelectedMatch] = useState<number>(0);

	const [inputValue, setInputValue] = useState<string>('');
	const toggleBottomSheet = () => {
		setIsBottomSheetVisible(!isBottomSheetVisible);
	};
	const toggleMatchBottomSheet = () => {
		setIsMatchSelectBottomSheetVisible(!isMatchSelectBottomSheetVisible);
	};

	const handleTeamSelect = (code: string) => {
		setSelectedTeam(code);
	};
	const handleMatchSelect = (code: number) => {
		setSelectedMatch(0);
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
			<div onClick={toggleMatchBottomSheet}>
				<FanpoolMatchSelectButton matchCount={13} />
			</div>
			<InputWithIcon
				placeholder="여기 근처에서 출발!"
				value={inputValue}
				onChange={() => {}}
			/>
			<div className="h-8pxr" />
			<div className="flex justify-between">
				<Text fontSize={12} fontWeight={500} color="gray400">
					인기순
				</Text>
				<div className="flex gap-2pxr">
					<Text fontSize={12} fontWeight={500} color="kboNavy">
						마감된 팬풀 안보기
					</Text>
					<IconCheckNavy />
				</div>
			</div>
			<MatchSelectBottomSheet
				isVisible={isMatchSelectBottomSheetVisible}
				onClose={toggleMatchBottomSheet}
				onMatchSelect={handleMatchSelect}
			/>
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
