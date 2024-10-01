import {
	IconChatActive,
	IconChatNav,
	IconHome,
	IconHomeActive,
	IconMap,
	IconMapActive,
	IconPeople,
	IconPeopleActive,
	IconSearch,
	IconSearchActive,
} from '@/public/icons';

export interface NavBarListTypes {
	name: string;
	path: string;
	defaultIcon: React.FC;
	activeIcon: React.FC;
}
export const navBarList: NavBarListTypes[] = [
	{
		name: '홈',
		path: '/home',
		defaultIcon: IconHome,
		activeIcon: IconHomeActive,
	},
	{
		name: '팬풀 찾기',
		path: '/fanpool-find',
		defaultIcon: IconSearch,
		activeIcon: IconSearchActive,
	},
	{
		name: '팬풀로그',
		path: '/fanpool-log',
		defaultIcon: IconMap,
		activeIcon: IconMapActive,
	},
	{
		name: '채팅',
		path: '/chat',
		defaultIcon: IconChatNav,
		activeIcon: IconChatActive,
	},
	{
		name: '내 팬풀',
		path: '/profile',
		defaultIcon: IconPeople,
		activeIcon: IconPeopleActive,
	},
];
