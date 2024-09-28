'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getKakaoLoginToken from '@/api/auth/getKakaoLogin';

export default function page() {
	const router = useRouter();

	useEffect(() => {
		const getUserToken = async (code: string) => {
			const response = await getKakaoLoginToken(code);
			console.log(response);
		};
		const code = new URL(window.location.href).searchParams.get('code');
		if (code) {
			getUserToken(code);
			// 이후 처리 로직 (예: 서버로 code 전송, 사용자 인증 처리 등)
		}
	}, []);

	return <div>카카오 로그인 처리 중...</div>;
}
