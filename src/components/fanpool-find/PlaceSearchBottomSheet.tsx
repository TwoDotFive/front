import React, { useState, useEffect } from 'react';
import BottomSheet from '../common/BottomSheet';
import { Text } from '../common/Text';
import Input from '../common/input/Input';
import useKakaoLoader from '../register/useKakaoLoader';

interface PlaceSearchBottomSheetProps {
	isVisible: boolean;
	onClose: () => void;
	onSelectPlace: (place: {
		name: string;
		id: string;
		x: string;
		y: string;
	}) => void;
}

export const PlaceSearchBottomSheet = ({
	isVisible,
	onClose,
	onSelectPlace,
}: PlaceSearchBottomSheetProps) => {
	useKakaoLoader();

	const [query, setQuery] = useState('');
	const [places, setPlaces] = useState<any[]>([]);

	// 검색 함수
	const searchPlaces = () => {
		const ps = new window.kakao.maps.services.Places();
		ps.keywordSearch(query, (data: any, status: any) => {
			if (status === window.kakao.maps.services.Status.OK) {
				setPlaces(data);
			} else {
				setPlaces([]);
			}
		});
	};

	useEffect(() => {
		if (query.trim()) {
			const debounce = setTimeout(() => {
				searchPlaces();
			}, 300);

			return () => clearTimeout(debounce);
		} else {
			setPlaces([]);
		}
	}, [query]);

	const handleSelectPlace = (place: any) => {
		onSelectPlace({
			name: place.place_name,
			id: place.id,
			x: place.x,
			y: place.y,
		});
		onClose();
	};

	return (
		<BottomSheet isVisible={isVisible} onClose={onClose}>
			<div className="h-600pxr">
				<Text fontSize={16} fontWeight={700} color="gray700">
					장소 검색
				</Text>
				<div className="mt-8pxr">
					<Input
						placeholder="장소를 입력하세요"
						value={query}
						onChange={(value) => setQuery(value)}
					/>
				</div>

				{/* 장소 검색 결과 */}
				<div className="mt-4">
					{places.length > 0 ? (
						<ul>
							{places.map((place, index) => (
								<div
									key={index}
									onClick={() => handleSelectPlace(place)}
									className="cursor-pointer py-4pxr"
								>
									<Text fontSize={14} fontWeight={700} color="gray700">
										{place.place_name}
									</Text>
									<Text fontSize={14} fontWeight={400} color="gray700">
										{place.road_address_name}
									</Text>
								</div>
							))}
						</ul>
					) : (
						<Text fontSize={14} color="gray600">
							검색 결과가 없습니다.
						</Text>
					)}
				</div>
			</div>
		</BottomSheet>
	);
};
