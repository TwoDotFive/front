'use client';

import { useState } from 'react';
import { IconCheckNavy } from '@/public/icons';
import BottomSheet from '../common/BottomSheet';
import { Text } from '../common/Text';
import SelectMatchButton from '../common/button/SelectMatchButton';

interface MatchSelectBottomSheetProps {
	isVisible: boolean;
	onClose: () => void;
	onMatchSelect: (code: number) => void;
}

const MatchSelectBottomSheet: React.FC<MatchSelectBottomSheetProps> = ({
	isVisible,
	onClose,
	onMatchSelect,
}) => {
	const games = [
		{
			id: 1,
			code: 'game1',
			awayTeam: {
				id: 2,
				name: '키움 히어로즈',
				representativeImageUrl: 'https://example.com/kiwoom.png',
				stadiumName: '구로 고척 스카이돔',
				stadiumAliasName: '고척',
			},
			homeTeam: {
				id: 1,
				name: '삼성 라이온즈',
				representativeImageUrl: 'https://example.com/samsung.png',
				stadiumName: '수원 위즈 파크',
				stadiumAliasName: '수원',
			},
			startDate: '2024-09-01T15:00:00',
			stadium: '수원 위즈 파크',
		},
		{
			id: 2,
			code: 'game1',
			awayTeam: {
				id: 2,
				name: '키움 히어로즈',
				representativeImageUrl: 'https://example.com/kiwoom.png',
				stadiumName: '구로 고척 스카이돔',
				stadiumAliasName: '고척',
			},
			homeTeam: {
				id: 1,
				name: '삼성 라이온즈',
				representativeImageUrl: 'https://example.com/samsung.png',
				stadiumName: '수원 위즈 파크',
				stadiumAliasName: '수원',
			},
			startDate: '2024-09-01T15:00:00',
			stadium: '수원 위즈 파크',
		},
		{
			id: 3,
			code: 'game1',
			awayTeam: {
				id: 2,
				name: '키움 히어로즈',
				representativeImageUrl: 'https://example.com/kiwoom.png',
				stadiumName: '구로 고척 스카이돔',
				stadiumAliasName: '고척',
			},
			homeTeam: {
				id: 1,
				name: '삼성 라이온즈',
				representativeImageUrl: 'https://example.com/samsung.png',
				stadiumName: '수원 위즈 파크',
				stadiumAliasName: '수원',
			},
			startDate: '2024-09-01T15:00:00',
			stadium: '수원 위즈 파크',
		},
		{
			id: 4,
			code: 'game1',
			awayTeam: {
				id: 2,
				name: '키움 히어로즈',
				representativeImageUrl: 'https://example.com/kiwoom.png',
				stadiumName: '구로 고척 스카이돔',
				stadiumAliasName: '고척',
			},
			homeTeam: {
				id: 1,
				name: '삼성 라이온즈',
				representativeImageUrl: 'https://example.com/samsung.png',
				stadiumName: '수원 위즈 파크',
				stadiumAliasName: '수원',
			},
			startDate: '2024-09-01T15:00:00',
			stadium: '수원 위즈 파크',
		},
		{
			id: 5,
			code: 'game1',
			awayTeam: {
				id: 2,
				name: '키움 히어로즈',
				representativeImageUrl: 'https://example.com/kiwoom.png',
				stadiumName: '구로 고척 스카이돔',
				stadiumAliasName: '고척',
			},
			homeTeam: {
				id: 1,
				name: '삼성 라이온즈',
				representativeImageUrl: 'https://example.com/samsung.png',
				stadiumName: '수원 위즈 파크',
				stadiumAliasName: '수원',
			},
			startDate: '2024-09-01T15:00:00',
			stadium: '수원 위즈 파크',
		},
		{
			id: 6,
			code: 'game1',
			awayTeam: {
				id: 2,
				name: '키움 히어로즈',
				representativeImageUrl: 'https://example.com/kiwoom.png',
				stadiumName: '구로 고척 스카이돔',
				stadiumAliasName: '고척',
			},
			homeTeam: {
				id: 1,
				name: '삼성 라이온즈',
				representativeImageUrl: 'https://example.com/samsung.png',
				stadiumName: '수원 위즈 파크',
				stadiumAliasName: '수원',
			},
			startDate: '2024-09-01T15:00:00',
			stadium: '수원 위즈 파크',
		},
		{
			id: 7,
			code: 'game1',
			awayTeam: {
				id: 2,
				name: '키움 히어로즈',
				representativeImageUrl: 'https://example.com/kiwoom.png',
				stadiumName: '구로 고척 스카이돔',
				stadiumAliasName: '고척',
			},
			homeTeam: {
				id: 1,
				name: '삼성 라이온즈',
				representativeImageUrl: 'https://example.com/samsung.png',
				stadiumName: '수원 위즈 파크',
				stadiumAliasName: '수원',
			},
			startDate: '2024-09-01T15:00:00',
			stadium: '수원 위즈 파크',
		},
		{
			id: 8,
			code: 'game1',
			awayTeam: {
				id: 2,
				name: '키움 히어로즈',
				representativeImageUrl: 'https://example.com/kiwoom.png',
				stadiumName: '구로 고척 스카이돔',
				stadiumAliasName: '고척',
			},
			homeTeam: {
				id: 1,
				name: '삼성 라이온즈',
				representativeImageUrl: 'https://example.com/samsung.png',
				stadiumName: '수원 위즈 파크',
				stadiumAliasName: '수원',
			},
			startDate: '2024-09-01T15:00:00',
			stadium: '수원 위즈 파크',
		},
	];

	const [selectedMatches, setSelectedMatches] = useState<number[]>(
		games.map((game) => game.id)
	);

	const handleMatchSelect = (id: number) => {
		setSelectedMatches((prevSelected) =>
			prevSelected.includes(id)
				? prevSelected.filter((matchId) => matchId !== id)
				: [...prevSelected, id]
		);
		onMatchSelect(id);
	};

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
				{/* 경기 선택 버튼들 렌더링 */}
				{games.map((game) => (
					<SelectMatchButton
						key={game.id}
						game={game}
						isSelected={selectedMatches.includes(game.id)}
						onClick={() => handleMatchSelect(game.id)}
					/>
				))}
			</div>
			<div className="h-12pxr" />
			<div
				className="w-full py-11pxr px-14pxr bg-primary rounded-8pxr text-center cursor-pointer"
				onClick={onClose}
			>
				<Text fontSize={16} fontWeight={600} color="white">
					{selectedMatches.length}개의 팬풀이 있어요
				</Text>
			</div>
		</BottomSheet>
	);
};

export default MatchSelectBottomSheet;
