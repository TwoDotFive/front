'use client';
import { useUserStore } from '@/store/useUserStore';
import { Text } from '../common/Text';
import { IconLeftArrow, IconPencilWhite } from '@/public/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import getUserLocation from '@/api/user/getUserLocation';
import SelectTeamButton from '../common/button/SelectTeamButton';
import Button from '../common/Button';

interface ProfileFormData {
	nickname: string;
	oneLiner: string;
	location: string[];
}

export default function ProfileEdit() {
	const router = useRouter();
	const { userProfile } = useUserStore();
	const [imgSrc, setImgSrc] = useState(
		userProfile?.profileImageUrl || '/images/image_profile_default.png'
	);
	const [locations, setLocations] = useState<string[]>([]); // 사용자의 동네 정보를 저장할 상태
	const [locationError, setLocationError] = useState(false); // 장소 인증 에러 상태 관리

	const handleBack = () => {
		router.back();
	};

	const handleImageError = () => {
		setImgSrc('/images/image_profile_default.png');
	};

	// React Hook Form을 사용하여 폼 관리
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
			location: [],
		},
	});

	// 사용자 동네 정보를 API로 불러오기
	useEffect(() => {
		const fetchUserLocations = async () => {
			try {
				const locationResponse = await getUserLocation();
				const locationNames = locationResponse.authenticatedLocations.map(
					(location) => location.addressInformation.dong
				);
				setLocations(locationNames);
				setValue('location', locationNames);
				setLocationError(false);
			} catch (error) {
				setLocationError(true);
				console.error('Failed to fetch user locations:', error);
			}
		};

		fetchUserLocations();
	}, [setValue]);

	// 폼 제출 시 호출되는 함수
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
							{...register('nickname')} // nickname을 react-hook-form으로 관리
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
						{locationError ? (
							<Button
								text="장소 등록하러 가기"
								width="100%"
								height="40px"
								onClick={() => router.push('/profile/edit/dongne')}
								enabledBackgroundColor="bg-primary"
								enabledTextColor="text-white"
								borderRadius={8}
							/>
						) : (
							<div>
								{locations.length > 0 ? (
									locations.map((location, index) => (
										<Text
											key={index}
											fontSize={14}
											fontWeight={400}
											color="gray600"
										>
											{location}
										</Text>
									))
								) : (
									<Text fontSize={14} fontWeight={400} color="gray600">
										등록된 동네가 없습니다.
									</Text>
								)}
							</div>
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
							{...register('oneLiner')} // oneLiner를 react-hook-form으로 관리
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
