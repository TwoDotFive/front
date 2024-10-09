import { IconKakao, IconSplashEmpty } from '@/public/icons';
import { Text } from '../common/Text';
import getKakaoLogin from '@/api/auth/getKakaoLogin';

export default function SplashLogin() {
	const handleLogin = async () => {
		try {
			const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
			const REST_API_KEY = '011aa7907a3ef6de56c400000fb08cf7';
			const INITIAL_URL_BASE = 'https://kauth.kakao.com/oauth/authorize';
			const INITIAL_URL_BASE_FULL =
				INITIAL_URL_BASE +
				'?client_id=' +
				REST_API_KEY +
				'&redirect_uri=' +
				REDIRECT_URI +
				'&response_type=code';

			// URL로 리다이렉트
			window.location.href = INITIAL_URL_BASE_FULL;
		} catch (error) {
			console.error('로그인 처리 중 오류 발생:', error);
		}
	};

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
				<button
					className="p-10pxr flex items-center justify-between bg-kakaoYellow w-300pxr h-50pxr rounded-12pxr cursor-pointer"
					onClick={handleLogin}
				>
					<div className="w-34pxr h-34pxr flex items-center justify-center">
						<IconKakao />
					</div>

					<Text fontSize={14} fontWeight={500}>
						카카오톡으로 시작하기
					</Text>
					<div className="w-34pxr h-34pxr" />
				</button>
				<div className="flex gap-13pxr">
					<Text
						fontSize={13}
						fontWeight={500}
						color="white"
						onClick={() => {
							window.location.href =
								'https://aromatic-bull-390.notion.site/10f9c4b3a467806c93ded35db1ab9c6b';
						}}
					>
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
