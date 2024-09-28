import { useState, useEffect } from 'react';
import { Text } from '../common/Text';
import SelectTeamButton from '../common/button/SelectTeamButton';
import BottomSheet from '../common/BottomSheet';
import { teams } from '@/constants/teams';
import getTeams from '@/api/baseball/getTeams';
import { useUserStore } from '@/store/useUserStore';
import patchUserProfile from '@/api/user/patchUserProfile';

interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function SelectTeamBottomSheet({
	isOpen,
	onClose,
}: BottomSheetProps) {
	const { userProfile, setUserProfile } = useUserStore();
	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
	const [apiTeams, setApiTeams] = useState<typeof teams>([]);

	// API에서 팀 데이터를 가져옴
	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const response = await getTeams();
				const mappedTeams = response.map((team) => {
					const matchedTeam = teams.find(
						(localTeam) => localTeam.id === team.id
					);
					return {
						id: team.id,
						code: matchedTeam ? matchedTeam.code : '',
						name: team.name,
						stadiumAliasName: team.stadiumAliasName,
						stadiumName: team.stadiumName,
						representativeImageUrl: team.representativeImageUrl,
					};
				});
				setApiTeams(mappedTeams);
			} catch (error) {
				console.error('Error fetching teams:', error);
			}
		};

		fetchTeams();
	}, []);

	// 팀 선택 시
	const handleTeamSelect = (code: string) => {
		setSelectedTeam(code);
	};

	// 선택한 팀 정보 저장 및 API 요청
	const handleSelect = async () => {
		// 선택한 팀 데이터 가져오기
		const selectedTeamData = apiTeams.find(
			(team) => team.code === selectedTeam
		);

		if (selectedTeamData && userProfile) {
			const updatedFavoriteTeam = {
				id: selectedTeamData.id,
				name: selectedTeamData.name,
				stadiumAliasName: selectedTeamData.stadiumAliasName,
				stadiumName: selectedTeamData.stadiumName,
				representativeImageUrl: selectedTeamData.representativeImageUrl!,
			};

			// userProfile 업데이트
			const updatedUserProfile = {
				...userProfile,
				favoriteTeam: updatedFavoriteTeam,
			};
			console.log(updatedUserProfile);
			// 상태 업데이트
			setUserProfile(updatedUserProfile);

			// 서버로 업데이트된 프로필 정보 전송
			try {
				const response = await patchUserProfile(updatedUserProfile);
				console.log(response);
				console.log('Favorite team updated successfully');
			} catch (error) {
				console.error('Failed to update favorite team:', error);
			}
		}

		onClose(); // 선택 완료 후 닫기
	};

	return (
		<BottomSheet isVisible={isOpen} onClose={onClose}>
			<div className="w-full bg-white rounded-t-20pxr pt-24pxr px-20pxr">
				<div className="flex flex-col pb-20pxr">
					<Text fontSize={20} fontWeight={700}>
						내가 응원하는 팀
					</Text>
					<Text fontSize={16} fontWeight={400}>
						응원 팀을 선택하면 홈 상단 배너에서 경기 일정을 알려드려요.{' '}
					</Text>
					<div className="h-18pxr" />

					<div className="grid grid-cols-3 gap-8pxr">
						{apiTeams.map((team, index) => (
							<div key={team.code || `team-${index}`} className="mb-8pxr">
								<SelectTeamButton
									code={team.code}
									isSelected={selectedTeam === team.code}
									onClick={() => handleTeamSelect(team.code)}
								/>
							</div>
						))}
						{/* 팀이 없는 경우의 선택지를 추가 */}
						<div key="none" className="mb-8pxr">
							<SelectTeamButton
								code=""
								isSelected={selectedTeam === ''}
								onClick={() => handleTeamSelect('')}
							/>
						</div>
					</div>
					<div className="h-40pxr" />
					<div
						className="w-full py-11pxr px-14pxr bg-primary rounded-8pxr text-center cursor-pointer"
						onClick={handleSelect}
					>
						<Text fontSize={16} fontWeight={600} color="white">
							선택 완료
						</Text>
					</div>
				</div>
			</div>
		</BottomSheet>
	);
}
