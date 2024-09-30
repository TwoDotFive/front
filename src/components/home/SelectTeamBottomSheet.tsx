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
	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
	const [apiTeams, setApiTeams] = useState<typeof teams>([]);
	const { userProfile, fetchUserProfile } = useUserStore();
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
	const handleTeamSelect = (code: string, id: string) => {
		setSelectedTeam(code);
	};

	// 선택한 팀 정보 저장 및 API 요청
	const handleSelect = async () => {
		const selectedTeamData = apiTeams.find(
			(team) => team.code === selectedTeam
		);
		const updatedUserProfile = {
			nickname: userProfile?.nickname,
			oneLiner: userProfile?.oneLiner,
			profileImageUrl: userProfile?.profileImageUrl,
			favoriteTeam: selectedTeamData?.id || '0',
		};
		try {
			const response = await patchUserProfile(updatedUserProfile);
			console.log(userProfile?.id!);
			fetchUserProfile(userProfile?.id!);

			onClose();
		} catch (error) {
			console.error('Failed to update favorite team:', error);
		}
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
									onClick={() => handleTeamSelect(team.code, team.id)}
								/>
							</div>
						))}
						{/* 팀이 없는 경우의 선택지를 추가 */}
						<div key="none" className="mb-8pxr">
							<SelectTeamButton
								code=""
								isSelected={selectedTeam === ''}
								onClick={() => handleTeamSelect('', '')}
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
