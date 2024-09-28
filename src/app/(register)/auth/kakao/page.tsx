'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function page() {
	const router = useRouter();

	useEffect(() => {
		// URL에서 authorization code 추출
		const code = new URL(window.location.href).searchParams.get('code');
		if (code) {
			// 서버로 code를 보내거나 추가 작업 수행
			console.log('카카오 로그인 코드:', code);

			// 이후 처리 로직 (예: 서버로 code 전송, 사용자 인증 처리 등)
			// router.push('/'); // 인증 후 리다이렉트 경로 설정
		}
	}, []);

	return <div>카카오 로그인 처리 중...</div>;
}
