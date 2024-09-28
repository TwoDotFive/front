'use client';

import { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Text } from '../../common/Text';
import GameCard from './GameCard';
import FanpoolButton from '../FanpoolButton';
import { Game } from '@/types/types';

interface GameScheduleProps {
	gameSchedule: { games: Game[]; numberOfGame: number } | null;
}

export default function GameSchedule({ gameSchedule }: GameScheduleProps) {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const dates = Array.from({ length: 7 }, (_, i) =>
		addDays(subDays(new Date(), 1), i)
	);

	const handleDateClick = (date: Date) => {
		setSelectedDate(date);
	};

	// 선택된 날짜에 해당하는 게임 필터링
	const gamesForSelectedDate = gameSchedule
		? gameSchedule.games.filter(
				(game) =>
					format(new Date(game.startDate), 'yyyy-MM-dd') ===
					format(selectedDate, 'yyyy-MM-dd')
		  )
		: [];

	return (
		<section className="w-full">
			<Text fontSize={20} fontWeight={700}>
				{format(selectedDate, 'M월', { locale: ko })} 경기 일정
			</Text>
			<div className="h-24pxr" />
			{/**
			 * 날짜 선택하는 부분
			 */}
			<div className="flex justify-between">
				{dates.map((date) => (
					<div
						key={date.toISOString()}
						className={`flex flex-col cursor-pointer p-12pxr items-center transition-transform duration-150 ${
							selectedDate.toDateString() === date.toDateString()
								? 'gap-2pxr transform -translate-y-2pxr rounded-[30px] border border-gray-100 bg-white shadow-md'
								: ''
						}`}
						onClick={() => handleDateClick(date)}
					>
						<Text
							fontSize={16}
							fontWeight={
								selectedDate.toDateString() === date.toDateString() ? 700 : 500
							}
							color={`${
								selectedDate.toDateString() === date.toDateString()
									? 'gray800'
									: 'gray600'
							}`}
						>
							{format(date, 'E', { locale: ko })}
						</Text>
						<Text
							fontSize={16}
							fontWeight={
								selectedDate.toDateString() === date.toDateString() ? 800 : 500
							}
							color="gray700"
						>
							{format(date, 'd')}
						</Text>
					</div>
				))}
			</div>
			<div className="h-36pxr" />
			{gamesForSelectedDate.length > 0 ? (
				<div
					className="rounded-12pxr"
					style={{ boxShadow: '0px 0px 11px 0px rgba(0, 0, 0, 0.11)' }}
				>
					{/**
					 * 경기 보여주는 부분
					 */}
					{gamesForSelectedDate.map((game) => (
						<GameCard key={game.id} game={game} />
					))}
					{/**
					 * 팬풀 검색 버튼
					 */}
					<FanpoolButton />
				</div>
			) : (
				<Text fontSize={16} color="gray700">
					선택된 날짜에 경기가 없습니다.
				</Text>
			)}
		</section>
	);
}
