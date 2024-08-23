'use client';
import { navBarList } from '@/constants/navBarList';
import NavItem from './NavBarItem';

export default function NavBar() {
	return (
		<div className="z-50 px-[34.5px] py-[8.5px] absolute bottom-0 flex w-full items-center justify-between bg-white rounded-t-12pxr">
			{navBarList.map((navItem) => (
				<NavItem
					name={navItem.name}
					key={navItem.path}
					defaultIcon={navItem.defaultIcon}
					activeIcon={navItem.activeIcon}
					path={navItem.path}
				/>
			))}
		</div>
	);
}
