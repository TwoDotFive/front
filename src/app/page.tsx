'use client';
import { useState, useEffect } from 'react';
import Splash from '@/components/splash/Splash';
import SplashLogin from '@/components/splash/SplashLogin';

export default function Page() {
	const [showSplash, setShowSplash] = useState(true);

	useEffect(() => {
		localStorage.removeItem('token');
		const timer = setTimeout(() => {
			setShowSplash(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="flex items-center justify-center">
			{showSplash ? <Splash /> : <SplashLogin />}
		</div>
	);
}
