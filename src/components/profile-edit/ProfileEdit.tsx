'use client';
import { useUserStore } from '@/store/useUserStore';
import { Text } from '../common/Text';
import {
	IconButtonPlus,
	IconDelete,
	IconLeftArrow,
	IconPencilWhite,
} from '@/public/icons';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import getUserLocation from '@/api/user/getUserLocation';
import SelectTeamButton from '../common/button/SelectTeamButton';
import Button from '../common/Button';
import { Location } from '@/types/types';
import patchUserLocation from '@/api/user/patchUserLocation';
import patchUserProfile from '@/api/user/patchUserProfile';
import { teams } from '@/constants/teams';
import {
	getPresignedUrl,
	uploadImageToS3,
} from '@/api/fanpool-log/create-log/step3';
import SelectTeamBottomSheet from '../profile/SelectTeamBotomSheet';
import deleteUserLocation from '@/api/user/deleteUserLocation';

interface ProfileFormData {
	nickname: string;
	oneLiner: string;
	location: string[];
}
interface LocationData {
	id: string;
	representative: boolean;
	addressInformation: Location;
}

export default function ProfileEdit() {
	const router = useRouter();
	const { userProfile } = useUserStore();
	const [imgSrc, setImgSrc] = useState(
		useUserStore((state) => state.userProfile?.profileImageUrl) ||
			'/images/image_profile_default.png'
	);
	const [locations, setLocations] = useState<LocationData[]>([]);
	const [locationError, setLocationError] = useState(false);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [isButtonActive, setIsButtonActive] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState<string>(
		userProfile?.favoriteTeam?.id || '0'
	);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleBack = () => {
		router.back();
	};

	const handleOpenSheet = () => {
		setIsSheetOpen(true);
	};

	const handleImageError = () => {
		setImgSrc('/images/image_profile_default.png');
	};

	const triggerFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<ProfileFormData>({
		defaultValues: {
			nickname: userProfile?.nickname || '',
			oneLiner: userProfile?.oneLiner || '',
		},
	});

	const nicknameValue = watch('nickname');
	const oneLinerValue = watch('oneLiner');

	useEffect(() => {
		if (userProfile) {
			setValue('nickname', userProfile.nickname);
			setValue('oneLiner', userProfile.oneLiner);
		}
	}, [userProfile, setValue]);

	useEffect(() => {
		if (
			userProfile?.nickname !== nicknameValue ||
			userProfile?.oneLiner !== oneLinerValue ||
			userProfile?.favoriteTeam?.id !== selectedTeam ||
			userProfile?.profileImageUrl !== imgSrc
		) {
			setIsButtonActive(true);
		} else {
			setIsButtonActive(false);
		}
	}, [nicknameValue, oneLinerValue, selectedTeam]);

	useEffect(() => {
		setSelectedTeam(userProfile?.favoriteTeam?.id || '');
		setImgSrc(
			userProfile?.profileImageUrl || '/images/image_profile_default.png'
		);
	}, [userProfile]);
	useEffect(() => {
		const fetchUserLocations = async () => {
			try {
				const locationResponse = await getUserLocation();

				const sortedLocations = locationResponse.authenticatedLocations.sort(
					(a, b) =>
						a.representative === b.representative
							? 0
							: a.representative
							? -1
							: 1
				);

				setLocations(sortedLocations);
				setLocationError(false);
			} catch (error) {
				setLocationError(true);
				console.error('Failed to fetch user locations:', error);
			}
		};

		fetchUserLocations();
	}, [setValue]);

	const handleDeleteLocation = async (
		location: LocationData,
		index: number
	) => {
		if (location.representative) {
			alert('대표동네를 해제하고 삭제해주세요');
			return;
		}
		try {
			await deleteUserLocation(location.id);
			alert('삭제되었습니다.');
			window.location.reload();
		} catch {
			alert('삭제 중 오류가 발생하였습니다.');
		}
	};

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};

	// 파일 선택 핸들러
	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			try {
				// Presigned URL 가져오기
				const presignedUrlResponse = await getPresignedUrl();
				const presignedUrl = presignedUrlResponse.toString();

				// S3에 이미지 업로드
				await uploadImageToS3(presignedUrl, file);

				// 업로드된 이미지의 URL 가져오기
				const uploadedImageUrl = presignedUrl.split('?')[0];
				setImgSrc(uploadedImageUrl); // 업로드한 이미지의 URL을 imgSrc에 설정
			} catch (error) {
				console.error('Image upload failed:', error);
			}
		}
	};

	const handleChangeDongne = async (location: LocationData, index: number) => {
		if (location.representative) return;
		if (
			confirm(location.addressInformation.dong + '로 대표동네를 변경할까요?')
		) {
			try {
				await patchUserLocation(location.id.toString());
				window.location.reload();
			} catch (error) {
				alert(error);
			}
		}
	};

	const onSubmit = async (data: ProfileFormData) => {
		const updatedUserProfile = {
			nickname: data.nickname,
			oneLiner: data.oneLiner,
			profileImageUrl: imgSrc,
			favoriteTeam: selectedTeam,
		};
		try {
			const response = await patchUserProfile(updatedUserProfile);
			router.back();
		} catch (error) {
			console.error('Failed to update favorite team:', error);
		}
	};
	const team = teams.find((team) => team.id === selectedTeam);

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
					color={isButtonActive ? 'kboBlue500' : 'gray200'}
					onClick={isButtonActive ? handleSubmit(onSubmit) : undefined}
					className={isButtonActive ? 'cursor-pointer' : 'cursor-not-allowed'}
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
					<img
						src={imgSrc}
						alt={'프로필 이미지'}
						onError={handleImageError}
						className="w-80pxr h-80pxr rounded-full"
					/>
					<div
						className="absolute right-2pxr bottom-2pxr w-22pxr h-22pxr rounded-full bg-gray700 flex items-center justify-center cursor-pointer"
						onClick={triggerFileInput}
					>
						<IconPencilWhite width={14} height={14} />
					</div>
					<input
						type="file"
						ref={fileInputRef}
						style={{ display: 'none' }}
						accept="image/*"
						onChange={handleFileChange}
					/>
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
							<div className="w-full flex gap-8pxr">
								<div
									className={`relative flex items-center justify-between w-full p-14pxr rounded-8pxr gap-10pxr ${
										locations[0].representative ? 'bg-kboBlue0' : 'bg-gray050'
									}`}
									onClick={() => {
										handleChangeDongne(locations[0], 0);
									}}
								>
									<div className="flex items-center gap-8pxr">
										<Text fontSize={16} fontWeight={500} color="gray700">
											{locations[0].addressInformation.dong}
										</Text>
										{locations[0].representative && (
											<Text fontSize={14} fontWeight={700} color="kboBlue500">
												대표
											</Text>
										)}
									</div>
									<div
										className="cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											handleDeleteLocation(locations[0], 0);
										}}
									>
										<IconDelete />
									</div>
								</div>
								<div
									className={`relative flex items-center justify-between w-full p-14pxr rounded-8pxr gap-10pxr ${'bg-gray050'}`}
									onClick={() => {
										handleChangeDongne(locations[0], 0);
									}}
								>
									<Text
										fontSize={16}
										fontWeight={500}
										color="gray300"
										className="cursor-pointer w-full text-center"
										onClick={() => router.push('/profile/edit/dongne')}
									>
										동네 추가
									</Text>
									<IconButtonPlus />
								</div>
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
							<Text
								fontSize={14}
								fontWeight={400}
								color="gray700"
								onClick={handleOpenSheet}
							>
								수정
							</Text>
						</div>
						<div className="w-102pxr">
							<SelectTeamButton code={team?.code || ''} />
						</div>
					</div>
				</form>
			</section>

			<SelectTeamBottomSheet
				isOpen={isSheetOpen}
				onClose={handleCloseSheet}
				handleSelectTeam={setSelectedTeam}
			/>
		</section>
	);
}
