'use client';

import { useState, useEffect, useRef } from 'react';
import { IconCheckNavy } from '@/public/icons';
import BottomSheet from '../common/BottomSheet';
import { Text } from '../common/Text';
import SelectMatchButton from '../common/button/SelectMatchButton';
import { useSearchStore } from '@/store/useSearchStore';
import { Game } from '@/types/types';
import getGame from '@/api/baseball/getGames';
import { formatDateTime } from '@/util/string';

interface MatchSelectBottomSheetProps {
	isVisible: boolean;
	onClose: () => void;
	onMatchSelect: (code: string[]) => void;
	fanpoolCount: number;
	setGameCount: (count: number) => void;
}

const MatchSelectBottomSheet = ({
	isVisible,
	onClose,
	onMatchSelect,
	fanpoolCount,
	setGameCount,
}: MatchSelectBottomSheetProps) => {
	const { selectedDate, selectedTeam } = useSearchStore();
	const selectedMatch = useSearchStore((state) => state.selectedMatches);
	const selectedMatchFunc = useSearchStore((state) => state.setSelectedMatches);

	// 게임 목록을 저장할 상태
	const [games, setGames] = useState<Game[]>([]);
	const [selectedMatches, setSelectedMatches] = useState<string[]>([]);

	// isFirst를 useRef로 관리하여 값이 렌더링 사이에서 유지되도록 함
	const isFirst = useRef(true);

	const fetchGames = async () => {
		const formattedDate = formatDateTime(selectedDate);
		try {
			const fetchedGames = await getGame(selectedTeam, formattedDate);
			setGames(fetchedGames);
			setGameCount(fetchedGames.length);

			// isFirst가 true이면 selectedMatchFunc을 호출하지 않음
			if (isFirst.current) {
				isFirst.current = false;
			} else {
				selectedMatchFunc([]);
			}
		} catch (error) {
			console.error('Failed to fetch games:', error);
		}
	};

	useEffect(() => {
		// API 호출
		fetchGames();
	}, [selectedTeam, selectedDate]);

	const handleMatchSelect = (id: string) => {
		const updatedSelectedMatches = selectedMatches.includes(id)
			? selectedMatches.filter((matchId) => matchId !== id)
			: [...selectedMatches, id];

		setSelectedMatches(updatedSelectedMatches);

		onMatchSelect(updatedSelectedMatches);
	};

	useEffect(() => {
		setSelectedMatches(selectedMatch);
	}, [selectedMatch]);

	return (
		<BottomSheet isVisible={isVisible} onClose={onClose}>
			<section className="flex items-center gap-4pxr">
				<Text fontSize={16} fontWeight={700}>
					경기({games.length})
				</Text>
				<IconCheckNavy />
			</section>
			<div className="h-12pxr" />
			<div className="h-330pxr overflow-scroll flex flex-col gap-12pxr">
				{/* 게임 목록을 렌더링 */}
				{games.length > 0 ? (
					games.map((game) => (
						<SelectMatchButton
							key={game.id}
							game={game}
							isSelected={selectedMatches.includes(game.id)}
							onClick={() => handleMatchSelect(game.id)}
						/>
					))
				) : (
					<Text fontSize={14} fontWeight={400} color="gray500">
						경기가 없습니다.
					</Text>
				)}
			</div>
			<div className="h-12pxr" />
			<div
				className="w-full py-11pxr px-14pxr bg-primary rounded-8pxr text-center cursor-pointer"
				onClick={() => onMatchSelect(selectedMatches)}
			>
				<Text fontSize={16} fontWeight={600} color="white">
					{fanpoolCount}개의 팬풀이 있어요
				</Text>
			</div>
		</BottomSheet>
	);
};

export default MatchSelectBottomSheet;
