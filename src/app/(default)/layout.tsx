import { LoginCheckProvider } from '@/provider/LoginCheckProvider';

export default function TabBarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<LoginCheckProvider>
			<div className="scroll-contents">{children}</div>
		</LoginCheckProvider>
	);
}
