import NavBar from '@/components/common/navbar/NavBar';

export default function DetailLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="scroll-contents">{children}</div>;
}
