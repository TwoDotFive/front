'use client';
import { useUserStore } from '@/store/useUserStore';
import { Text } from '../common/Text';
import { IconDelete, IconLeftArrow, IconPencilWhite } from '@/public/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import getUserLocation from '@/api/user/getUserLocation';
import SelectTeamButton from '../common/button/SelectTeamButton';
import Button from '../common/Button';
import { Location } from '@/types/types';
import patchUserLocation from '@/api/user/patchUserLocation';

interface ProfileFormData {
	nickname: string;
	oneLiner: string;
	location: string[];
}
interface LocationData {
	id: number;
	representative: boolean;
	addressInformation: Location;
}

export default function ProfileEdit() {
	const router = useRouter();
	const { userProfile } = useUserStore();
	const [imgSrc, setImgSrc] = useState(
		userProfile?.profileImageUrl || '/images/image_profile_default.png'
	);
	const [locations, setLocations] = useState<LocationData[]>([]); // 사용자의 동네 정보를 저장할 상태
	const [locationError, setLocationError] = useState(false); // 장소 인증 에러 상태 관리
	console.log(userProfile);
	const handleBack = () => {
		router.back();
	};

	const handleImageError = () => {
		setImgSrc('/images/image_profile_default.png');
	};

	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm<ProfileFormData>({
		defaultValues: {
			nickname: userProfile?.nickname || '',
			oneLiner: userProfile?.oneLiner || '',
		},
	});
	useEffect(() => {
		if (userProfile) {
			setValue('nickname', userProfile.nickname);
			setValue('oneLiner', userProfile.oneLiner);
		}
	}, [userProfile]);
	useEffect(() => {
		const fetchUserLocations = async () => {
			try {
				const locationResponse = await getUserLocation();
				const locationNames = locationResponse.authenticatedLocations.map(
					(location) => location.addressInformation.dong
				);

				setLocations(locationResponse.authenticatedLocations);
				setLocationError(false);
			} catch (error) {
				setLocationError(true);
				setLocations([
					{
						id: 1001,
						representative: true,
						addressInformation: {
							fullText: '서울특별시 강남구 테헤란로 123',
							zipNo: '06134',
							sido: '서울특별시',
							sigungu: '강남구',
							dong: '역삼동',
							dongCd: '11680101',
							x: '127.028600',
							y: '37.497942',
						},
					},
					{
						id: 1002,
						representative: false,
						addressInformation: {
							fullText: '경기도 성남시 분당구 판교역로 240',
							zipNo: '13529',
							sido: '경기도',
							sigungu: '성남시 분당구',
							dong: '삼평동',
							dongCd: '41220250',
							x: '127.108690',
							y: '37.402095',
						},
					},
				]);
				console.error('Failed to fetch user locations:', error);
			}
		};

		fetchUserLocations();
	}, [setValue]);

	const handleDeleteLocation = (location: LocationData, index: number) => {
		console.log('삭제');
	};

	const handleChangeDongne = async (location: LocationData, index: number) => {
		if (location.representative) return;
		if (
			confirm(location.addressInformation.dong + '로 대표동네를 변경할까요?')
		) {
			try {
				await patchUserLocation(location.id.toString());
				// TODO: 성공 시 리로드
			} catch (error) {
				alert(error);
			}
		}
	};

	const onSubmit = (data: ProfileFormData) => {
		console.log('Updated Data:', data);
	};

	return (
		<section>
			<div className="w-full h-49pxr flex items-center justify-between">
				<IconLeftArrow className="cursor-pointer" onClick={handleBack} />
				<Text fontSize={18} fontWeight={500} color="gray700">
					프로필 수정
				</Text>
				<Text
					fontSize={15}
					fontWeight={700}
					color="gray200"
					onClick={handleSubmit(onSubmit)}
					className="cursor-pointer"
				>
					완료
				</Text>
			</div>

			<section
				className="overflow-y-scroll flex flex-col"
				style={{ height: 'calc(100vh - 49px)' }}
			>
				<div className="h-14pxr" />
				<div className="relative w-fit">
					<Image
						src={imgSrc}
						width={80}
						height={80}
						alt={'프로필 이미지'}
						onError={handleImageError}
					/>
					<div className="absolute right-2pxr bottom-2pxr w-22pxr h-22pxr rounded-full bg-gray700 flex items-center justify-center">
						<IconPencilWhite width={14} height={14} />
					</div>
				</div>
				<div className="h-45pxr" />
				<form
					className="flex flex-col gap-40pxr"
					onSubmit={handleSubmit(onSubmit)}
				>
					{/**
					 * 닉네임
					 */}
					<div className="flex flex-col gap-8pxr">
						<Text fontSize={18} fontWeight={700} color="gray700">
							닉네임
						</Text>
						<input
							{...register('nickname')}
							className="w-full h-full p-12pxr rounded-8pxr bg-gray050 placeholder:text-gray400 text-sm"
						/>
					</div>

					{/**
					 * 내 동네 (선택된 동네 표시)
					 */}
					<div className="flex flex-col gap-8pxr">
						<Text fontSize={18} fontWeight={700} color="gray700">
							내 동네
						</Text>
						{locations.length === 1 && (
							<div>
								<Text fontSize={14} fontWeight={400} color="gray600">
									{locations[0].addressInformation.dong}
								</Text>
								<Text
									fontSize={14}
									fontWeight={500}
									color="kboBlue500"
									className="cursor-pointer"
									onClick={() => router.push('/profile/edit/dongne')}
								>
									동네 추가
								</Text>
							</div>
						)}

						{locations.length === 2 && (
							<div className="flex gap-8pxr w-full">
								{locations.map((location, index) => (
									<div
										className={`relative flex items-center justify-between w-full p-14pxr rounded-8pxr gap-10pxr ${
											location.representative ? 'bg-kboBlue0' : 'bg-gray050'
										}`}
										key={index}
										onClick={() => {
											handleChangeDongne(location, index);
										}}
									>
										<div className="flex items-center gap-8pxr">
											<Text
												key={index}
												fontSize={16}
												fontWeight={500}
												color="gray700"
											>
												{location.addressInformation.dong}
											</Text>
											{location.representative && (
												<Text fontSize={14} fontWeight={700} color="kboBlue500">
													대표
												</Text>
											)}
										</div>
										<div
											className="cursor-pointer"
											onClick={(e) => {
												e.stopPropagation();
												handleDeleteLocation(location, index);
											}}
										>
											<IconDelete />
										</div>
									</div>
								))}
							</div>
						)}

						{locations.length === 0 && (
							<Button
								text="장소 등록하러 가기"
								width="100%"
								height="40px"
								onClick={(e) => {
									e?.preventDefault();
									router.push('/profile/edit/dongne');
								}}
								enabledBackgroundColor="bg-primary"
								enabledTextColor="text-white"
								borderRadius={8}
							/>
						)}
						<Text fontSize={12} fontWeight={400} color="gray700">
							클릭하여 대표 동네를 바꿀 수 있어요
						</Text>
					</div>

					{/**
					 * 자기소개
					 */}
					<div className="flex flex-col gap-8pxr">
						<Text fontSize={18} fontWeight={700} color="gray700">
							자기소개
						</Text>
						<textarea
							{...register('oneLiner')}
							className="w-full h-100pxr p-12pxr rounded-8pxr bg-gray050 placeholder:text-gray400 text-sm resize-none"
						/>
					</div>

					{/**
					 * 응원 팀
					 */}
					<div className="flex flex-col gap-8pxr">
						<div className="flex justify-between">
							<Text fontSize={18} fontWeight={700} color="gray700">
								응원 팀
							</Text>
							<Text fontSize={14} fontWeight={400} color="gray700">
								수정
							</Text>
						</div>
						<div className="w-102pxr">
							<SelectTeamButton code="kt" />
						</div>
					</div>
				</form>
			</section>
		</section>
	);
}
