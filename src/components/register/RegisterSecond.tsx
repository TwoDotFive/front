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
	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

	const handleTeamSelect = (code: string) => {
		setSelectedTeam(code);
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
					onClick={handleNext}
				/>
			</div>
		</section>
	);
};
