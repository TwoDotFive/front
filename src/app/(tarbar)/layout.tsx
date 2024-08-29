import NavBar from '@/components/common/navbar/NavBar';

export default function TabBarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="scroll-contents">
			{children}
			<div className="h-60pxr" />
			<NavBar />
		</div>
	);
}
