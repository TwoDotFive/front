import Image from 'next/image';
import { Text } from '../common/Text';

export default function Profile() {
	return (
		<section>
			<div className="h-14pxr" />
			<div className="flex flex-col items-center">
				<Image
					src={'/images/image_profile_default.png'}
					width={80}
					height={80}
					alt={''}
				/>
				<div className="h-8pxr" />
				<Text fontSize={16} fontWeight={700} color="gray700">
					네임드호빵
				</Text>
				<div className="h-2pxr" />
				<div className="flex gap-4pxr">
					<div className="px-10pxr py-4pxr rounded-44pxr bg-gray050">
						<Text fontSize={14} fontWeight={400} color="gray400">
							신촌동
						</Text>
					</div>
					<div className="px-10pxr py-4pxr rounded-44pxr bg-gray050">
						<Text fontSize={14} fontWeight={400} color="gray400">
							방이동
						</Text>
					</div>
				</div>
				<div className="h-14pxr" />
				<Text fontSize={12} fontWeight={500} color="gray600" className="w-full">
					안녕하세요~~~ 키움 5년차 팬입니다~~ 최대 두 줄까지만 가능한 것으로
					합시다 그렇다면 글자수가 몇자 제한이 될까요 한 번 세보도록하
				</Text>
				<div className="h-8pxr" />
				<div className="flex gap-4pxr items-center">
					<div className="w-26pxr h-26pxr bg-gray-400 rounded-full" />
					<Text fontSize={12} fontWeight={700}>
						키움히어로즈
						<Text fontSize={12} fontWeight={500} className="inline">
							에 관심있어요
						</Text>
					</Text>
				</div>
			</div>
		</section>
	);
}
