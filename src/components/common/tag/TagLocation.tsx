import { Text } from '../Text';

export default function TagLocation({ name }: { name: string }) {
	return (
		<div className="bg-warmOrange0 px-6pxr py-2pxr w-fit h-fit rounded-4pxr">
			<Text fontSize={12} fontWeight={600} color="warmOrange500">
				{name}
			</Text>
		</div>
	);
}
