import { useState, useEffect } from 'react';
import { Text } from '../common/Text';
import getUserLocation from '@/api/user/getUserLocation';

export default function ProfileDongne({ id }: { id: string }) {
	const [locations, setLocations] = useState<string[]>([]);
	const [isDongne, setIsDongne] = useState<boolean>(true);

	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const response = await getUserLocation(id);
				if (response.authenticatedLocations.length === 0) {
					throw new Error('No authenticated locations');
				}
				const locationNames = response.authenticatedLocations.map(
					(location) => location.addressInformation.dong
				);
				setLocations(locationNames);
			} catch (error) {
				setIsDongne(false);
				console.error('Error fetching locations:', error);
			}
		};

		fetchLocations();
	}, []);

	return (
		<div className="flex gap-4pxr">
			{isDongne && locations.length > 0 ? (
				locations.map((dong, index) => (
					<div
						key={index}
						className="px-10pxr py-4pxr rounded-44pxr bg-gray050"
					>
						<Text fontSize={14} fontWeight={400} color="gray400">
							{dong}
						</Text>
					</div>
				))
			) : (
				<Text fontSize={14} fontWeight={400} color="gray400">
					등록된 동네가 없습니다.
				</Text>
			)}
		</div>
	);
}
