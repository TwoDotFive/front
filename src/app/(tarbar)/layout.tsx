import NavBar from '@/components/common/navbar/NavBar';
import { LoginCheckProvider } from '@/provider/LoginCheckProvider';

export default function TabBarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<LoginCheckProvider>
			<div className="scroll-contents">
				{children}
				<div className="h-60pxr" />
				<NavBar />
			</div>
		</LoginCheckProvider>
	);
}
