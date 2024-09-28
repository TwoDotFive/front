'use client';
import { useState } from 'react';
import { Text } from '../common/Text';
import MakeFanpoolButton from '../common/button/MakeFanpoolButton';
import MakeFanpoolLogButton from '../common/button/MakeFanpoolLogButton';
import { useRouter } from 'next/navigation';

interface ProfileTabMenuProps {
	fanpoolCount?: number;
	logCount?: number;
}

export default function ProfileTabMenu({
	fanpoolCount = 0,
	logCount = 0,
}: ProfileTabMenuProps) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1');

	const handleTabClick = (tab: 'tab1' | 'tab2') => {
		setActiveTab(tab);
	};

	const handleClick = () => {
		router.push('/fanpool-add');
	};

	return (
		<section>
			{/* 메뉴 섹션 */}
			<div className="flex w-full">
				<div
					className={`flex-1 text-center cursor-pointer pb-12pxr ${
						activeTab === 'tab1' ? 'border-b-2 border-gray800' : ''
					}`}
					onClick={() => handleTabClick('tab1')}
				>
					<Text
						fontSize={16}
						fontWeight={activeTab === 'tab1' ? 700 : 400}
						color="gray700"
					>
						모집한 팬풀 {fanpoolCount}
					</Text>
				</div>
				<div
					className={`flex-1 text-center cursor-pointer pb-12pxr ${
						activeTab === 'tab2' ? 'border-b-2 border-gray800' : ''
					}`}
					onClick={() => handleTabClick('tab2')}
				>
					<Text
						fontSize={16}
						fontWeight={activeTab === 'tab2' ? 700 : 400}
						color="gray700"
					>
						팬풀로그 {logCount}
					</Text>
				</div>
			</div>

			<div className="h-30pxr" />
			{/* 탭에 따른 컨텐츠 영역 */}
			<div>
				{activeTab === 'tab1' && (
					<div>
						{fanpoolCount > 0 ? (
							<Text fontSize={14} fontWeight={500} color="gray600">
								모집한 팬풀
							</Text>
						) : (
							<div className="mt-92pxr flex flex-col gap-14pxr items-center">
								<Text
									fontSize={12}
									fontWeight={500}
									color="gray500"
									className="text-center"
								>
									모집한 팬풀이 없어요!
									<br />
									새로운 팬풀을 모집해봐요!
								</Text>
								<MakeFanpoolButton onClick={handleClick} />
							</div>
						)}
					</div>
				)}
				{activeTab === 'tab2' && (
					<div>
						{logCount > 0 ? (
							<Text fontSize={14} fontWeight={500} color="gray600">
								팬풀로그
							</Text>
						) : (
							<div className="mt-92pxr flex flex-col gap-14pxr items-center">
								<Text
									fontSize={12}
									fontWeight={500}
									color="gray500"
									className="text-center"
								>
									등록된 로그가 없어요
									<br />
									지금 새 로그를 만들어 볼까요?
								</Text>
								<MakeFanpoolLogButton
									onClick={() => console.log('Button clicked!')}
								/>
							</div>
						)}
					</div>
				)}
			</div>
		</section>
	);
}
