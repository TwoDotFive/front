'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getKakaoLoginToken from '@/api/auth/getKakaoLogin';

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		const getUserToken = async (code: string) => {
			try {
				const response = await getKakaoLoginToken(code);
				localStorage.setItem('token', response.accessToken);
				if (response.firstLogin) {
					router.push('/register');
				} else {
					router.push('/home');
				}
			} catch (error) {
				console.error('Error during Kakao login:', error);
			}
		};

		const code = new URL(window.location.href).searchParams.get('code');
		if (code) {
			getUserToken(code);
		}
	}, [router]);

	return <div>카카오 로그인 처리 중...</div>;
}
