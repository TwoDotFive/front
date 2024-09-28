import { IconBookmarkChecked, IconBookmarkUnChecked } from '@/public/icons';

interface BookmarkProps {
	isChecked: boolean;
	onClick: () => void;
}

export default function Bookmark({ isChecked, onClick }: BookmarkProps) {
	return (
		<div onClick={onClick} className="cursor-pointer">
			{isChecked ? <IconBookmarkChecked /> : <IconBookmarkUnChecked />}
		</div>
	);
}
