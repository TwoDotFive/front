import React, { useState } from 'react';
import {
	UseFormRegister,
	UseFormSetValue,
	UseFormGetValues,
} from 'react-hook-form';
import { Text } from '../common/Text';
import Button from '../common/Button';
import useKakaoLoader from './useKakaoLoader';
import { Map } from 'react-kakao-maps-sdk';
import { IconGPS } from '@/public/icons';
import getAddress from '@/api/geo/getAddress';
import postUserLocation from '@/api/user/postUserLocation';

interface RegisterThirdProps {
	register: UseFormRegister<any>;
	handleNext: () => void;
	setValue: UseFormSetValue<any>;
	getValues: UseFormGetValues<any>;
	handleSubmit: () => void;
}

export const RegisterThird = ({
	register,
	handleNext,
	getValues,
}: RegisterThirdProps) => {
	useKakaoLoader();

	const [mapCenter, setMapCenter] = useState({
		lat: 33.450701,
		lng: 126.570667,
	});
	const [address, setAddress] = useState('');
	const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(true);
	const [loading, setLoading] = useState(false);

	const getAddressFromCoords = async (lat: number, lng: number) => {
		const geocoder = new window.kakao.maps.services.Geocoder();
		const coord = new window.kakao.maps.LatLng(lat, lng);

		// getAddress API 호출
		const response = await getAddress(lng, lat);
		console.log('Address API Response:', response);

		// 카카오 지도 API를 사용한 추가 처리
		geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
			if (status === window.kakao.maps.services.Status.OK) {
				console.log('Kakao API Address:', result[0]);
				setAddress(
					result[0].address.region_1depth_name +
						' ' +
						result[0].address.region_2depth_name
				);
			} else {
				setAddress('주소를 찾을 수 없습니다.');
			}
		});
	};

	// 내 위치 설정 버튼 클릭 시
	const handleSetMyLocation = () => {
		if (navigator.geolocation) {
			setLoading(true);
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setMapCenter({ lat: latitude, lng: longitude });
					getAddressFromCoords(latitude, longitude);
					setLoading(false);
				},
				() => {
					setIsGeolocationEnabled(false);
					setLoading(false);
				},
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 0,
				}
			);
		} else {
			alert('Geolocation을 사용할 수 없습니다.');
			setIsGeolocationEnabled(false);
		}
	};

	const handleMapCenterChanged = (map: any) => {
		const newCenter = map.getCenter();
		const lat = newCenter.getLat();
		const lng = newCenter.getLng();

		setMapCenter({ lat, lng });
		getAddressFromCoords(lat, lng);
	};

	const handleSubmitLocation = async () => {
		try {
			// 위도와 경도를 기반으로 주소 정보를 받아옴
			const response = await getAddress(mapCenter.lng, mapCenter.lat);

			// 받은 주소 정보에 대표 위치 설정 추가
			const locationData = {
				...response,
				representative: true, // 대표 위치 설정
			};

			// 사용자 위치 정보를 서버로 전송
			await postUserLocation(locationData);

			// 성공 시 handleNext 호출
			handleNext();
		} catch (error) {
			console.error('Error submitting location:', error);
			alert('위치 정보를 저장하는 데 실패했습니다.');
		}
	};

	return (
		<section className="mt-16pxr px-20pxr">
			<div className="flex flex-col gap-4pxr">
				<Text fontSize={18} fontWeight={700} color="kboNavy">
					<Text
						fontSize={24}
						fontWeight={700}
						color="kboNavy"
						className="inline-block"
					>
						3
					</Text>
					/3
				</Text>
				<Text fontSize={18} fontWeight={700}>
					어느 동네에 거주 중이신가요?
				</Text>
				<Text fontSize={14} fontWeight={400}>
					위치 기반으로 더 편리한 팬풀을 제공해드려요!
				</Text>
			</div>
			<div className="flex flex-col gap-8pxr mt-32pxr">
				<button
					className="flex gap-4pxr transition duration-200 select-none w-full h-40pxr bg-kboBlue0 rounded-8pxr items-center justify-center"
					onClick={handleSetMyLocation}
				>
					<IconGPS />
					<Text fontSize={14} fontWeight={700} color="kboBlue500">
						현재 내 위치로 설정
					</Text>
				</button>
				<Map
					id="map"
					center={mapCenter}
					style={{
						width: '100%',
						height: '200px',
					}}
					level={3}
					onCenterChanged={handleMapCenterChanged}
				/>

				{!isGeolocationEnabled && (
					<Text fontSize={14} fontWeight={500} color="fireRed400">
						위치 정보를 가져올 수 없습니다. 권한을 허용해주세요.
					</Text>
				)}

				{loading && (
					<Text fontSize={14} fontWeight={500} color="gray600">
						위치를 가져오는 중입니다...
					</Text>
				)}

				{address && !loading && (
					<div className="flex flex-col gap-4pxr items-center">
						<Text fontSize={20} fontWeight={700} color="kboBlue500">
							{address}
						</Text>
						<Text fontSize={16} fontWeight={600} color="kboNavy">
							나의 대표 동네로 설정할게요
						</Text>
						<Text fontSize={12} fontWeight={400} color="gray500">
							내 동네는 마이페이지에서 2개까지 설정, 수정할 수 있어요
						</Text>
					</div>
				)}
			</div>

			<div className="fixed bottom-40pxr left-0 right-0 px-20pxr">
				<Button
					width="100%"
					height="50px"
					text={'다음'}
					borderRadius={8}
					disabled={address === '' || loading}
					enabledTextColor={'text-white'}
					enabledBackgroundColor={'bg-primary'}
					disabledTextColor={'text-gray300'}
					disabledBackgroundColor={'bg-gray100'}
					onClick={handleSubmitLocation} // 다음 버튼 클릭 시 위치 제출
				/>
			</div>
		</section>
	);
};
