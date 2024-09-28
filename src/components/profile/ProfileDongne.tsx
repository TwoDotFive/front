import { useState, useEffect } from 'react';
import { Text } from '../common/Text';
import getUserLocation from '@/api/user/getUserLocation'; // API 호출 함수 임포트

export default function ProfileDongne() {
	const [locations, setLocations] = useState<string[]>([]);

	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const response = await getUserLocation();
				const locationNames = response.authenticatedLocations.map(
					(location) => location.addressInformation.dong
				);
				setLocations(locationNames);
			} catch (error) {
				console.error('Error fetching locations:', error);
			}
		};

		fetchLocations();
	}, []);

	return (
		<div className="flex gap-4pxr">
			{locations.map((dong, index) => (
				<div key={index} className="px-10pxr py-4pxr rounded-44pxr bg-gray050">
					<Text fontSize={14} fontWeight={400} color="gray400">
						{dong}
					</Text>
				</div>
			))}
		</div>
	);
}
