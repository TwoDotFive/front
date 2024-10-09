'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { FanpoolSubmitButton } from './FanpoolSubmitButton';
import { Text } from '../common/Text';
import { FanpoolMatchBottomSheet } from './FanpoolMatchBottomSheet';
import SelectHighlightButton from '../common/button/SelectHighlightButton';
import PlusButton from '../common/button/PlusButton';
import MinusButton from '../common/button/MinusButton';
import { IconDefaultPin, IconPencilGray } from '@/public/icons';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { PlaceSearchBottomSheet } from './PlaceSearchBottomSheet';
import { Game } from '@/types/types';
import FanpoolMatchItem from './FanpoolMatchItem';
import getAddress from '@/api/geo/getAddress';
import postAddFanpool from '@/api/fanpool/postAddFanpool';
import { useRouter } from 'next/navigation';

interface FanpoolFormData {
	title: string;
	datePeriod: '오전' | '오후';
	hour: number;
	minute: number;
	fanpoolType: 'CAR_SHARE' | 'TAXI_PARTY' | null;
	collectCount: number;
	passengerCondition: 'ANY' | 'MALE_ONLY' | 'FEMALE_ONLY';
	memo: string | '';
}

export default function FanpoolAddForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors },
		watch,
	} = useForm<FanpoolFormData>({
		defaultValues: {
			fanpoolType: null,
			collectCount: 1,
			passengerCondition: 'ANY',
			datePeriod: '오전',
			hour: 12,
			minute: 0,
			memo: '',
		},
	});
	const [bottomSheet, setBottomSheet] = useState<{
		visible: boolean;
		type: 'date' | 'match' | 'place' | null;
	}>({
		visible: false,
		type: null,
	});
	const [selectedPlace, setSelectedPlace] = useState<{
		name: string;
		x: string;
		y: string;
	} | null>(null);

	const fanpoolType = useWatch({ control, name: 'fanpoolType' });
	const collectCount = useWatch({ control, name: 'collectCount' });
	const title = useWatch({ control, name: 'title' });
	const hour = useWatch({ control, name: 'hour' });
	const minute = useWatch({ control, name: 'minute' });
	const datePeriod = useWatch({ control, name: 'datePeriod' });
	const passengerCondition = useWatch({ control, name: 'passengerCondition' });

	const [isSubmitting, setIsSubmitting] = useState(false);

	// 선택된 경기 정보를 관리하는 상태
	const [selectedGame, setSelectedGame] = useState<Game | null>(null);

	const checkIsSubmitting = () => {
		if (
			fanpoolType &&
			hour &&
			minute !== null &&
			collectCount > 0 &&
			passengerCondition &&
			selectedPlace &&
			title
		) {
			setIsSubmitting(true);
		} else {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		checkIsSubmitting();
	}, [
		fanpoolType,
		hour,
		minute,
		collectCount,
		passengerCondition,
		selectedPlace,
		title,
	]);

	const onSubmit: SubmitHandler<FanpoolFormData> = async (data) => {
		try {
			// 주소 정보를 가져오는 API 호출
			const addressResponse = await getAddress(
				selectedPlace?.x!,
				selectedPlace?.y!
			);

			// 오전/오후와 시간(hour), 분(minute)을 조합하여 departAt 생성
			const gameDate = new Date(selectedGame!.startDate);
			let hour = data.hour;

			if (data.datePeriod === '오후' && hour !== 12) {
				hour += 12;
			} else if (data.datePeriod === '오전' && hour === 12) {
				hour = 0;
			}

			// 새로운 Date 객체로 departAt 생성
			const departAt = new Date(
				gameDate.getFullYear(),
				gameDate.getMonth(),
				gameDate.getDate(),
				hour, // 시간
				data.minute, // 분
				0 // 초는 항상 00
			).toISOString();

			const inputData = {
				title: data.title,
				departAt: departAt,
				gameId: selectedGame!.id,
				numberOfPeople: data.collectCount,
				memo: data.memo || '',
				fanpoolType: data.fanpoolType!,
				genderConstraint: data.passengerCondition,
				departFrom: addressResponse,
			};
			// postAddFanpool 호출
			await postAddFanpool(inputData);
			alert('팬풀이 생성되었습니다.');
			router.replace('/home');
		} catch (error) {
			console.error('팬풀 생성 중 오류 발생:', error);
		}
	};

	const openBottomSheet = (type: 'date' | 'match' | 'place') => {
		setBottomSheet({ visible: true, type });
	};

	const closeBottomSheet = () => {
		setBottomSheet({ visible: false, type: null });
	};

	const handleTypeSelect = (type: 'CAR_SHARE' | 'TAXI_PARTY') => {
		setValue('fanpoolType', type);
	};

	const handleCollectCountChange = (change: number) => {
		setValue('collectCount', Math.max(1, collectCount + change));
	};

	const handlePlaceSelect = (place: { name: string; x: string; y: string }) => {
		setSelectedPlace(place);
		closeBottomSheet();
	};

	const handleGameSelect = (game: Game | null) => {
		setSelectedGame(game);
		closeBottomSheet();
	};

	return (
		<section
			className="overflow-y-scroll"
			style={{ height: 'calc(100vh - 49px)' }}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-40pxr px-20pxr pt-17pxr"
			>
				<div className="flex flex-col gap-8pxr">
					<Text fontSize={18} fontWeight={700} color="gray700">
						팬풀 유형
					</Text>
					<div className="flex gap-8pxr">
						<SelectHighlightButton
							text="차량공유"
							isSelected={fanpoolType === 'CAR_SHARE'}
							onClick={() => handleTypeSelect('CAR_SHARE')}
						/>
						<SelectHighlightButton
							text="택시팟"
							isSelected={fanpoolType === 'TAXI_PARTY'}
							onClick={() => handleTypeSelect('TAXI_PARTY')}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-8pxr">
					<Text fontSize={18} fontWeight={700} color="gray700">
						보러 갈 경기
					</Text>
					{!selectedGame ? (
						<div
							className="w-full h-full p-12pxr rounded-8pxr bg-gray100 cursor-pointer text-center"
							onClick={() => openBottomSheet('match')}
						>
							<Text fontSize={16} fontWeight={500} color="gray700">
								경기 찾아보기
							</Text>
						</div>
					) : (
						<FanpoolMatchItem game={selectedGame} />
					)}
				</div>

				<div className="flex flex-col gap-8pxr">
					<Text fontSize={18} fontWeight={700} color="gray700">
						출발 일시
					</Text>
					<div className="flex gap-40pxr">
						{/* 오전/오후 선택 */}
						<div className="flex items-center gap-12pxr">
							<label className="flex gap-8pxr">
								<input
									type="radio"
									value="오전"
									{...register('datePeriod')}
									defaultChecked
								/>
								<Text fontSize={16} fontWeight={500} color="gray700">
									오전
								</Text>
							</label>
							<label className="flex gap-8pxr">
								<input type="radio" value="오후" {...register('datePeriod')} />
								<Text fontSize={16} fontWeight={500} color="gray700">
									오후
								</Text>
							</label>
						</div>

						{/* 시/분 입력 */}
						<div className="flex items-center gap-8pxr">
							<input
								type="number"
								{...register('hour', {
									required: true,
									min: 1,
									max: 12,
									valueAsNumber: true,
								})}
								placeholder="시"
								className="w-40pxr h-40pxr rounded-8pxr border-none bg-gray050 p-2"
							/>
							<Text fontSize={16} fontWeight={500} color="gray600">
								시
							</Text>

							<input
								type="number"
								{...register('minute', {
									required: true,
									min: 0,
									max: 59,
									valueAsNumber: true,
								})}
								placeholder="분"
								className="w-40pxr h-40pxr rounded-8pxr border-none bg-gray050  p-2"
							/>
							<Text fontSize={16} fontWeight={500} color="gray600">
								분
							</Text>
						</div>
					</div>
					{errors.hour && <p>시간을 올바르게 입력해주세요</p>}
					{errors.minute && <p>분을 올바르게 입력해주세요</p>}
				</div>

				<div className="flex flex-col">
					<Text fontSize={18} fontWeight={700} color="gray700">
						모집 인원
					</Text>
					<div className="h-4pxr" />

					<Text fontSize={14} fontWeight={400} color="gray700">
						나를 제외하고 함께 이동할 인원 수를 선택해주세요.
					</Text>
					<div className="h-14pxr" />
					<div className="flex justify-between items-center">
						<MinusButton
							onClick={() => {
								handleCollectCountChange(-1);
							}}
						/>
						<div className="flex gap-2pxr items-center">
							<Text fontSize={18} fontWeight={700} color="gray700">
								{collectCount}명
							</Text>
							<IconPencilGray />
						</div>
						<PlusButton onClick={() => handleCollectCountChange(1)} />
					</div>
				</div>

				<div className="flex flex-col gap-8pxr">
					<Text fontSize={18} fontWeight={700} color="gray700">
						동승자 조건
					</Text>
					<div className="h-4pxr" />

					<Text fontSize={14} fontWeight={400} color="gray700" className="mt-2">
						조건에 맞지 않는 회원도 채팅을 걸 수 있으며, 내가 수락하면 채팅을
						통해 조건을 조율할 수 있어요.
					</Text>

					<div className="flex flex-col gap-12pxr">
						<label className="flex items-center gap-2pxr">
							<input
								type="radio"
								value="ANY"
								{...register('passengerCondition')}
								defaultChecked
							/>
							<Text fontSize={14} fontWeight={400} color="gray700">
								성별 무관
							</Text>
						</label>

						<label className="flex items-center gap-2pxr">
							<input
								type="radio"
								value="FEMALE_ONLY"
								{...register('passengerCondition')}
							/>
							<Text fontSize={14} fontWeight={400} color="gray700">
								여자만
							</Text>
						</label>

						<label className="flex items-center gap-2pxr">
							<input
								type="radio"
								value="MALE_ONLY"
								{...register('passengerCondition')}
							/>
							<Text fontSize={14} fontWeight={400} color="gray700">
								남자만
							</Text>
						</label>
					</div>
				</div>

				<div className="flex flex-col gap-8pxr">
					<Text fontSize={18} fontWeight={700} color="gray700">
						출발 장소
					</Text>
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

					{/* 지도 표시 */}
					{selectedPlace && (
						<Map
							center={{
								lat: Number(selectedPlace.y),
								lng: Number(selectedPlace.x),
							}}
							style={{ width: '100%', height: '200px' }}
							level={3}
						>
							<MapMarker
								position={{
									lat: Number(selectedPlace.y),
									lng: Number(selectedPlace.x),
								}}
							/>
						</Map>
					)}
				</div>

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
						하고싶은 말
						<Text
							fontSize={18}
							fontWeight={400}
							color="gray700"
							className="inline"
						>
							(선택)
						</Text>
					</Text>

					<textarea
						placeholder="내 팬풀에 대해 더 자세한 정보를 제공하면 응답율이 높아져요."
						className="w-full h-100pxr p-12pxr rounded-8pxr bg-gray050 placeholder:text-gray400 text-sm resize-none"
						{...register('memo')}
					/>
				</div>
				<div className="h-80pxr" />
				<FanpoolSubmitButton isSubmitting={isSubmitting} />
			</form>

			<FanpoolMatchBottomSheet
				isVisible={bottomSheet.visible && bottomSheet.type === 'match'}
				onClose={closeBottomSheet}
				onGameSelect={handleGameSelect}
			/>
			<PlaceSearchBottomSheet
				isVisible={bottomSheet.visible && bottomSheet.type === 'place'}
				onClose={closeBottomSheet}
				onSelectPlace={handlePlaceSelect}
			/>
		</section>
	);
}
