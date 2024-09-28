export default function TabBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="scroll-contents">{children}</div>;
}
