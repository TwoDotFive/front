'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { FanpoolSubmitButton } from './FanpoolSubmitButton';
import { FanpoolDateBottomSheet } from './FanpoolDateBottomSheet';
import { Text } from '../common/Text';
import { FanpoolMatchBottomSheet } from './FanpoolMatchBottomSheet';
import SelectHighlightButton from '../common/button/SelectHighlightButton';
import PlusButton from '../common/button/PlusButton';
import MinusButton from '../common/button/MinusButton';
import { IconDefaultPin, IconPencilGray } from '@/public/icons';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { PlaceSearchBottomSheet } from './PlaceSearchBottomSheet';

interface FanpoolFormData {
	title: string;
	date: Date;
	fanpoolType: '차량공유' | '택시팟' | null;
	collectCount: number;
	passengerCondition: '남녀모두' | '남자만' | '여자만';
}

export default function FanpoolAddForm() {
	const { register, handleSubmit, setValue, control } =
		useForm<FanpoolFormData>({
			defaultValues: {
				fanpoolType: null,
				collectCount: 1,
				passengerCondition: '남녀모두',
			},
		});
	const [bottomSheet, setBottomSheet] = useState<{
		visible: boolean;
		type: 'date' | 'match' | 'place' | null;
	}>({
		visible: false,
		type: null,
	});
	const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State to store selected date
	const [selectedPlace, setSelectedPlace] = useState<{
		name: string;
		x: string;
		y: string;
	} | null>(null);

	const fanpoolType = useWatch({
		control,
		name: 'fanpoolType',
	});

	const collectCount = useWatch({
		control,
		name: 'collectCount',
	});

	const onSubmit: SubmitHandler<FanpoolFormData> = (data) => {
		console.log('데이터 : ', data);
	};

	const handleDateSelect = (date: Date) => {
		setSelectedDate(date);
		setValue('date', date);
		setBottomSheet({ visible: false, type: null });
	};

	const openBottomSheet = (type: 'date' | 'match' | 'place') => {
		setBottomSheet({ visible: true, type });
	};

	const closeBottomSheet = () => {
		setBottomSheet({ visible: false, type: null });
	};

	const handleTypeSelect = (type: '차량공유' | '택시팟') => {
		setValue('fanpoolType', type);
	};

	const handleCollectCountChange = (change: number) => {
		setValue('collectCount', Math.max(1, collectCount + change));
	};

	const handlePlaceSelect = (place: { name: string; x: string; y: string }) => {
		setSelectedPlace(place);
		closeBottomSheet();
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

				<div className="flex flex-col gap-8pxr">
					<Text fontSize={18} fontWeight={700} color="gray700">
						팬풀 유형
					</Text>
					<div className="flex gap-8pxr">
						<SelectHighlightButton
							text="차량공유"
							isSelected={fanpoolType === '차량공유'}
							onClick={() => handleTypeSelect('차량공유')}
						/>
						<SelectHighlightButton
							text="택시팟"
							isSelected={fanpoolType === '택시팟'}
							onClick={() => handleTypeSelect('택시팟')}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-8pxr">
					<Text fontSize={18} fontWeight={700} color="gray700">
						모집 인원
					</Text>
					<div className="h-4pxr" />
					<Text fontSize={14} fontWeight={400} color="gray700">
						함께 이동할 인원수를 선택해주세요.
					</Text>

					<div className="flex justify-between items-center">
						<MinusButton onClick={() => handleCollectCountChange(-1)} />
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
								value="성별무관"
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
								value="여자만"
								{...register('passengerCondition')}
							/>
							<Text fontSize={14} fontWeight={400} color="gray700">
								여자만
							</Text>
						</label>

						<label className="flex items-center gap-2pxr">
							<input
								type="radio"
								value="남자만"
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
					<div className="h-8pxr" />
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
					/>
				</div>

				<div className="h-150pxr" />
				<FanpoolSubmitButton isSubmitting={false} />
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
			<PlaceSearchBottomSheet
				isVisible={bottomSheet.visible && bottomSheet.type === 'place'}
				onClose={closeBottomSheet}
				onSelectPlace={handlePlaceSelect}
			/>
		</>
	);
}
