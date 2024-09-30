import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Text } from '../common/Text';
import {
	IconCheckNavy,
	IconDefaultPin,
	IconFilter,
	IconUnChecked,
} from '@/public/icons';
import FilterBottomSheet from './FilterBottomSheet';
import { teams } from '@/constants/teams';
import FanpoolMatchSelectButton from '../common/fanpool/FanpoolMatchSelectButton';
import MatchSelectBottomSheet from './MatchSelectBottomSheet';
import { PlaceSearchBottomSheet } from './PlaceSearchBottomSheet';
import getFanpoolFilter from '@/api/fanpool/getFanpoolFilter';
import { FanpoolInformation } from '@/types/types';
import { useSearchStore } from '@/store/useSearchStore'; // Zustand 스토어 import
import getAddress from '@/api/geo/getAddress';

interface FindFilterProps {
	setFanpoolData: (fanpools: FanpoolInformation[]) => void;
}

export default function FindFilter({ setFanpoolData }: FindFilterProps) {
	const {
		selectedMatches,
		selectedDate,
		selectedTeam,
		selectedPlace,
		isCheckDeadline,
		setSelectedMatches,
		setSelectedDate,
		setSelectedTeam,
		setSelectedPlace,
		toggleCheckDeadline,
	} = useSearchStore();

	const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
	const [isMatchSelectBottomSheetVisible, setIsMatchSelectBottomSheetVisible] =
		useState(false);

	const [bottomSheet, setBottomSheet] = useState<{
		visible: boolean;
		type: 'date' | 'match' | 'place' | null;
	}>({
		visible: false,
		type: null,
	});

	const toggleBottomSheet = () => {
		setIsBottomSheetVisible(!isBottomSheetVisible);
	};

	const toggleMatchBottomSheet = () => {
		setIsMatchSelectBottomSheetVisible(!isMatchSelectBottomSheetVisible);
	};

	const handleTeamSelect = (id: string) => {
		setSelectedTeam(id); // 팀 선택시 상태 업데이트
	};

	const handleMatchSelect = (matchIds: string[]) => {
		setSelectedMatches(matchIds); // 경기 선택시 상태 업데이트
	};

	const handleDateSelect = (date: Date) => {
		setSelectedDate(date); // 날짜 선택시 상태 업데이트
	};

	const openBottomSheet = (type: 'date' | 'match' | 'place') => {
		setBottomSheet({ visible: true, type });
	};

	const closeBottomSheet = () => {
		setBottomSheet({ visible: false, type: null });
	};

	const handlePlaceSelect = (
		place: {
			name: string;
			id: string;
			x: string;
			y: string;
		} | null
	) => {
		setSelectedPlace(place); // 장소 선택시 상태 업데이트
		closeBottomSheet();
	};

	const formatDate = (date: Date) => {
		return format(date, 'yy.MM.dd');
	};

	useEffect(() => {
		const fetchFanpoolData = async () => {
			let dongCd; // dongCd 값을 저장할 변수

			// selectedPlace가 있는 경우에만 getAddress 호출
			if (selectedPlace) {
				try {
					const addressResponse = await getAddress(
						selectedPlace.x,
						selectedPlace.y
					);
					dongCd = addressResponse.dongCd;
				} catch (error) {
					console.error('Failed to fetch address:', error);
				}
			} else {
				dongCd = undefined;
			}

			try {
				const fanpoolResponse = await getFanpoolFilter({
					teamId: selectedTeam ? selectedTeam : undefined,
					dongCd: dongCd,
					gameId: selectedMatches,
					onlyGathering: isCheckDeadline,
				});
				setFanpoolData(fanpoolResponse.fanpools);
			} catch (error) {
				console.error('Failed to fetch fanpool data:', error);
			}
		};

		fetchFanpoolData();
	}, [
		selectedMatches,
		selectedDate,
		selectedTeam,
		selectedPlace,
		isCheckDeadline,
		setFanpoolData,
	]);

	return (
		<div className="flex flex-col gap-8pxr">
			<div className="flex gap-8pxr">
				<div className="relative w-36pxr h-30pxr flex justify-center items-center rounded-4pxr cursor-pointer bg-white border border-gray200">
					<IconFilter onClick={toggleBottomSheet} />
				</div>
				<div
					className={`relative h-30pxr flex justify-center items-center rounded-4pxr px-10pxr cursor-pointer ${'bg-kboBlue0 border border-kboBlue400'}`}
					onClick={toggleBottomSheet}
				>
					<Text
						fontSize={14}
						fontWeight={700}
						color={'kboBlue500'}
						className="whitespace-nowrap text-center"
					>
						{selectedTeam
							? teams.find((team) => team.id === selectedTeam)?.name
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
				<FanpoolMatchSelectButton matchCount={selectedMatches.length} />
			</div>
			<div
				className="relative w-full h-40pxr cursor-pointer"
				onClick={() => openBottomSheet('place')}
			>
				<IconDefaultPin className="absolute left-8pxr top-1/2 transform -translate-y-1/2" />
				<div className="w-full h-full pl-40pxr pr-8pxr py-8pxr rounded-8pxr bg-gray050">
					<Text fontSize={14} color="gray500">
						{selectedPlace ? selectedPlace.name : '위치를 입력해주세요'}
					</Text>
				</div>
			</div>
			<div className="h-8pxr" />
			<div className="flex justify-between">
				<Text fontSize={12} fontWeight={500} color="gray400">
					인기순
				</Text>
				<div
					className="flex gap-4pxr items-center"
					onClick={toggleCheckDeadline}
				>
					<Text fontSize={12} fontWeight={500} color="kboNavy">
						마감된 팬풀 안보기
					</Text>
					{isCheckDeadline ? <IconCheckNavy /> : <IconUnChecked />}
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
				onDateSelect={handleDateSelect}
			/>
			<PlaceSearchBottomSheet
				isVisible={bottomSheet.visible && bottomSheet.type === 'place'}
				onClose={closeBottomSheet}
				onSelectPlace={handlePlaceSelect}
			/>
		</div>
	);
}
