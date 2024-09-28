import React, { useState, useEffect } from 'react';
import {
	UseFormRegister,
	UseFormSetValue,
	UseFormGetValues,
} from 'react-hook-form';
import { Text } from '../common/Text';
import Button from '../common/Button';
import { teams } from '@/constants/teams';
import SelectTeamButton from '../common/button/SelectTeamButton';
import getTeams from '@/api/baseball/getTeams';
import { useUserStore } from '@/store/useUserStore';
import patchUserProfile from '@/api/user/patchUserProfile';

interface RegisterSecondProps {
	register: UseFormRegister<any>;
	handleNext: () => void;
	setValue: UseFormSetValue<any>;
	getValues: UseFormGetValues<any>;
}

export const RegisterSecond = ({
	register,
	handleNext,
	getValues,
}: RegisterSecondProps) => {
	const { userProfile, setUserProfile } = useUserStore();
	const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
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
	const handleTeamSelect = (id: number) => {
		setSelectedTeam(id);
	};

	// 선택한 팀 정보 저장 및 API 요청
	const handleSelect = async () => {
		const selectedTeamData = apiTeams.find(
			(team) => team.code === selectedTeam?.toString()
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

			// 서버로 업데이트된 프로필 정보 전송
			try {
				const response = await patchUserProfile(updatedUserProfile);
				console.log(response);
				console.log('Favorite team updated successfully');
				setUserProfile(updatedUserProfile);
				handleNext();
			} catch (error) {
				console.error('Failed to update favorite team:', error);
			}
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
						2
					</Text>
					/3
				</Text>
				<Text fontSize={18} fontWeight={700}>
					응원하는 팀을 알려주세요!
				</Text>
				<Text fontSize={14} fontWeight={400}>
					응원 팀은 나중에 바꿀 수 있어요
				</Text>
			</div>
			<div className="flex flex-col gap-8pxr mt-54pxr">
				<div className="grid grid-cols-3 gap-8pxr">
					{teams.map((team, index) => (
						<div key={team.code} className="mb-8pxr">
							<SelectTeamButton
								code={team.code}
								isSelected={selectedTeam === team.id}
								onClick={() => handleTeamSelect(team.id)}
							/>
						</div>
					))}
					{/* 팀이 없는 경우의 선택지를 추가 */}
					<div key="none" className="mb-8pxr">
						<SelectTeamButton
							code=""
							isSelected={selectedTeam === 0}
							onClick={() => handleTeamSelect(0)}
						/>
					</div>
				</div>
			</div>

			<div className="fixed bottom-40pxr left-0 right-0 px-20pxr">
				<Button
					width="100%"
					height="50px"
					text={'다음'}
					borderRadius={8}
					disabled={selectedTeam === null}
					enabledTextColor={'text-white'}
					enabledBackgroundColor={'bg-primary'}
					disabledTextColor={'text-gray300'}
					disabledBackgroundColor={'bg-gray100'}
					onClick={handleSelect}
				/>
			</div>
		</section>
	);
};
