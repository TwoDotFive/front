'use client';
import { FloatingMakeButton } from '@/components/button/FloatingMakeButton';
import LocationDeleteButton from '@/components/button/LocationDeleteButton';
import MinusButton from '@/components/button/MinusButton';
import PlusButton from '@/components/button/PlusButton';
import { RadioButton } from '@/components/button/RadioButton';
import SelectAreaButton from '@/components/button/SelectAreaButton';
import SelectButton from '@/components/button/SelectButton';
import SelectHighlightButton from '@/components/button/SelectHighlightButton';
import SelectTeamButton from '@/components/button/SelectTeamButton';
import LocationInfoCard from '@/components/card/LocationInfoCard';
import LocationInfoMiniCard from '@/components/card/LocationInfoMiniCard';
import LocationInfoSearchCard from '@/components/card/LocationInfoSearchCard';
import TravelogAddCard from '@/components/card/TravelogAddCard';
import TravelogCard from '@/components/card/TravelogCard';
import TravelogLocationCard from '@/components/card/TravelogLocationCard';
import Button from '@/components/common/Button';
import TapBar from '@/components/common/TapBar';
import Input from '@/components/input/Input';
import InputWithIcon from '@/components/input/InputWithIcon';
import { TagFanPool } from '@/components/tag/TagFanPool';
import TagLocation from '@/components/tag/TagLocation';
import ChatTapBar from '@/components/tapbar/chatTapBar';
import { FanPoolType } from '@/constants/fanpoolType';
import { teams } from '@/constants/teams';
import { useState } from 'react';

export default function Home() {
	const [isSelected, setIsSelected] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

	const handleTeamSelect = (code: string) => {
		setSelectedTeam(code);
	};

	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (value: string) => {
		setInputValue(value);
	};

	const fanPoolTypes: FanPoolType[] = [
		'CAR_SHARE',
		'TAXI_PARTY',
		'ANY',
		'FEMALE_ONLY',
		'MALE_ONLY',
	];

	const tagNames = ['식당', '인기많은', '지역명소', '선수방문', '할인중'];
	return (
		<div className="p-30pxr flex flex-col gap-20pxr">
			<FloatingMakeButton onClick={() => {}} />
			<div className="flex gap-20px">
				<PlusButton onClick={() => {}} />
				<MinusButton onClick={() => {}} />
			</div>

			<div className="flex gap-20pxr w-32pxr">
				<RadioButton
					isSelected={isSelected}
					onClick={() => {
						setIsSelected(!isSelected);
					}}
				/>
				<RadioButton
					isSelected={!isSelected}
					onClick={() => {
						setIsSelected(!isSelected);
					}}
				/>
			</div>
			<div className="grid grid-cols-2 gap-10pxr">
				{teams.map((team) => (
					<SelectAreaButton
						key={team.code}
						code={team.code}
						isSelected={selectedTeam === team.code}
						onClick={() => handleTeamSelect(team.code)}
					/>
				))}
			</div>
			<SelectButton
				isSelected={isSelected}
				onClick={() => {
					setIsSelected(!isSelected);
				}}
			/>
			<SelectButton
				isSelected={!isSelected}
				onClick={() => {
					setIsSelected(!isSelected);
				}}
			/>
			<div className="flex gap-20pxr">
				<SelectHighlightButton
					text="차량공유"
					isSelected={isSelected}
					onClick={() => {
						setIsSelected(!isSelected);
					}}
				/>
				<SelectHighlightButton
					text="택시팟"
					isSelected={!isSelected}
					onClick={() => {
						setIsSelected(!isSelected);
					}}
				/>
			</div>
			<div className="grid grid-cols-2 gap-10pxr">
				{teams.map((team) => (
					<SelectTeamButton
						key={team.code}
						code={team.code}
						isSelected={selectedTeam === team.code}
						onClick={() => handleTeamSelect(team.code)}
					/>
				))}
			</div>
			<div className="flex gap-20pxr">
				<Button
					width="320px"
					height="50px"
					text={'팬풀 찾아보기'}
					borderRadius={8}
					enabledTextColor={'text-white'}
					enabledBackgroundColor={'bg-primary'}
					disabledTextColor={'text-[#5679A3]'}
					disabledBackgroundColor={'bg-primary'}
					onClick={() => {}}
				/>
				<Button
					width="320px"
					height="50px"
					text={'팬풀 찾아보기'}
					borderRadius={8}
					enabledTextColor={'text-white'}
					enabledBackgroundColor={'bg-primary'}
					disabledTextColor={'text-[#5679A3]'}
					disabledBackgroundColor={'bg-primary'}
					onClick={() => {}}
					disabled={true}
				/>
			</div>
			<div className="flex gap-20pxr">
				<Button
					width="320px"
					height="50px"
					text={'더보기'}
					borderRadius={8}
					enabledTextColor={'text-gray700'}
					enabledBackgroundColor={'bg-gray100'}
					disabledTextColor={'text-gray300'}
					disabledBackgroundColor={'bg-primary'}
					onClick={() => {}}
				/>
				<Button
					width="320px"
					height="50px"
					text={'더보기'}
					borderRadius={8}
					enabledTextColor={'text-gray700'}
					enabledBackgroundColor={'bg-gray100'}
					disabledTextColor={'text-gray300'}
					disabledBackgroundColor={'bg-gray100'}
					onClick={() => {}}
					disabled={true}
				/>
			</div>
			<div className="flex gap-20pxr">
				<Button
					width="320px"
					height="50px"
					text={'더보기'}
					borderRadius={8}
					enabledTextColor={'text-kboBlue500'}
					enabledBackgroundColor={'bg-kboBlue0'}
					disabledTextColor={'text-kboBlue400'}
					disabledBackgroundColor={'bg-kboBlue0'}
					onClick={() => {}}
				/>
				<Button
					width="320px"
					height="50px"
					text={'더보기'}
					borderRadius={8}
					enabledTextColor={'text-kboBlue500'}
					enabledBackgroundColor={'bg-kboBlue0'}
					disabledTextColor={'text-kboBlue400'}
					disabledBackgroundColor={'bg-kboBlue0'}
					onClick={() => {}}
					disabled={true}
				/>
			</div>
			<div className="flex gap-20pxr">
				<Button
					width="320px"
					height="50px"
					text={'메모추가'}
					borderRadius={8}
					fontSize={14}
					fontWeight={700}
					enabledTextColor={'text-kboBlue500'}
					enabledBackgroundColor={'bg-kboBlue0'}
					disabledTextColor={'text-gray600'}
					disabledBackgroundColor={'bg-gray050'}
					onClick={() => {}}
				/>
				<Button
					width="320px"
					height="50px"
					text={'메모추가'}
					borderRadius={8}
					enabledTextColor={'text-kboBlue500'}
					enabledBackgroundColor={'bg-kboBlue0'}
					disabledTextColor={'text-gray600'}
					disabledBackgroundColor={'bg-gray050'}
					onClick={() => {}}
					disabled={true}
				/>
			</div>
			<div className="w-360pxr flex flex-col gap-20pxr">
				<TapBar text="팬풀 찾아보기" type="left" />
				<TapBar text="팬풀 찾아보기" type="mid" isNextButton={true} />
				<TapBar text="팬풀 찾아보기" type="download" />
				<TapBar text="팬풀 찾아보기" type="none" />
				<ChatTapBar
					text="팬풀 찾아보기"
					team="두산 베어스"
					fanpoolCount={24}
					fanpoolLogCount={15}
				/>
			</div>
			<Input
				placeholder="여기 근처에서 출발!"
				value={inputValue}
				onChange={handleInputChange}
			/>
			<InputWithIcon
				placeholder="여기 근처에서 출발!"
				value={inputValue}
				onChange={handleInputChange}
			/>
			<div className="flex gap-10pxr">
				{fanPoolTypes.map((type) => (
					<TagFanPool key={type} type={type} />
				))}
			</div>
			<div className="flex gap-10pxr">
				{tagNames.map((name) => (
					<TagLocation key={name} name={name} />
				))}
			</div>
			<div className="flex gap-10pxr">
				<LocationInfoCard image={'/images/kt.png'} name="잠실 야구 경기장" location="서울 잠실" tagNames={tagNames}/>
			</div>
			<TravelogCard image='/images/kt.png' userName='네임드호빵' userImage='/images/kt.png' title='비오는날 경기 대신 서울 나들이' locations={['잠실야구장', '피처캠프 신천점', '새마을 전통시장','멸치집 본점']} />
			<LocationInfoMiniCard image={'/images/doosan.png'} name='잠실종합운동장 잠실야구장' location='서울 송파구 올림픽로 25'/>
			<LocationInfoSearchCard image={'images/doosan.png'} name='잠실종합운동장 잠실야구장' location='서울 송파구 올림픽로 25'/>
			<LocationDeleteButton image={'images/doosan.png'} name='잠실종합운동장 잠실야구장' onClick={() => {}}/>
			<div className='flex flex-col gap-10pxr'>
				<TravelogLocationCard image='/images/kt.png' name='수원 KT위즈파크' location='경기도 수원시 장안구' userId='myUserId'/>
				<TravelogLocationCard image='/images/kt.png' name='수원 KT위즈파크' location='경기도 수원시 장안구' userId='unknown'/>
			</div>
			<div className='flex flex-col gap-10pxr'>
				<TravelogAddCard image='/images/kt.png' name='수원 KT위즈파크' location='경기도 수원시 장안구' description="설명입니다~설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다" userId='myUserId' locationImage={['/images/kt.png']}/>
				<TravelogAddCard image='/images/kt.png' name='수원 KT위즈파크' location='경기도 수원시 장안구' description="설명입니다~설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다" userId='myUserId' locationImage={['/images/kt.png','/images/kt.png']}/>
				<TravelogAddCard image='/images/kt.png' name='수원 KT위즈파크' location='경기도 수원시 장안구' description="설명입니다~설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다" userId='yourId' locationImage={['/images/kt.png','/images/kt.png','/images/kt.png']}/>
				<TravelogAddCard image='/images/kt.png' name='수원 KT위즈파크' location='경기도 수원시 장안구' description="설명입니다~설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다" userId='yourId' locationImage={['/images/kt.png','/images/kt.png','/images/kt.png','/images/kt.png']}/>
			</div>
		</div>
	);
}
