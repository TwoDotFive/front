'use client';
import { NavBarListTypes } from '@/constants/navBarList';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Text } from '../Text';

export default function NavItem({
	name,
	path,
	defaultIcon,
	activeIcon,
}: NavBarListTypes) {
	const pathname: string | null = usePathname();

	const isActive = pathname === path || pathname.startsWith(path);
	const IconComponent = isActive ? activeIcon : defaultIcon;

	return (
		<Link
			href={path}
			className="flex flex-col gap-2pxr cursor-pointer items-center"
		>
			<IconComponent />
			<Text
				fontSize={12}
				fontWeight={700}
				color={`${isActive ? 'primary' : 'gray300'}`}
			>
				{name}
			</Text>
		</Link>
	);
}
