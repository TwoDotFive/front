import { IconKakao, IconSplashEmpty } from '@/public/icons';
import { Text } from '../common/Text';

export default function SplashLogin() {
	return (
		<section
			className="w-full h-screen relative bg-cover bg-center"
			style={{ backgroundImage: "url('/images/image_splash_background.png')" }}
		>
			<div className="absolute top-[33vh] left-20pxr flex gap-12pxr flex-col justify-center">
				<IconSplashEmpty />
				<Text
					fontSize={38}
					fontWeight={400}
					className="font-sanTokki"
					color="white"
				>
					야구는 함께하면
					<br />더 즐거우니까!
				</Text>
				<Text fontSize={18} fontWeight={400} color="white">
					직관 계획부터 카풀&택시팟까지!
					<br />
					야구팬 커뮤니티{' '}
					<Text fontSize={18} fontWeight={700} className="inline-block">
						팬풀
					</Text>
					에서 시작해보세요
				</Text>
			</div>

			<div className="absolute bottom-44pxr left-0 right-0 flex justify-center flex-col gap-20pxr items-center">
				<button className="p-10pxr flex items-center justify-between bg-kakaoYellow w-300pxr h-50pxr rounded-12pxr cursor-pointer">
					<div className="w-34pxr h-34pxr flex items-center justify-center">
						<IconKakao />
					</div>

					<Text fontSize={14} fontWeight={500}>
						카카오톡으로 시작하기
					</Text>
					<div className="w-34pxr h-34pxr" />
				</button>
				<div className="flex gap-13pxr">
					<Text fontSize={13} fontWeight={500} color="white">
						서비스 이용약관
					</Text>
					<Text fontSize={13} fontWeight={500} color="white">
						|
					</Text>
					<Text fontSize={13} fontWeight={500} color="white">
						개인정보처리방침
					</Text>
				</div>
			</div>
		</section>
	);
}
