import NavBar from '@/components/common/navbar/NavBar';

export default function TabBarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="scroll-contents bg-primary">
			{children}
			<NavBar />
		</div>
	);
}
