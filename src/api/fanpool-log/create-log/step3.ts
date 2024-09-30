import apiClient from '@/api/index';
import { Schedule } from '@/store/fanpool-log/store';

export const getPresignedUrl = async () => {
	const response = await apiClient.get(`/file/presigned-url`);
	return response;
};

export const uploadImageToS3 = async (url: string, file: File) => {
	try {
		await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': file.type,
			},
			body: file,
		});
	} catch (error) {
		console.error(error);
	}
};

export const postFanoolLog = async (
	title: string,
	image: string | null,
	stadiumId: number,
	schedules: Schedule[]
) => {
	const response = await apiClient.post(`/tour/log`, {
		title,
		image,
		stadiumId,
		schedules,
	});
	return response;
};

export const editFanpoolLog = async (
	id: string,
	title: string,
	image: string | null,
	schedules: Schedule[]
) => {
	const response = await apiClient.put(
		`/tour/log`,
		{
			id,
			title,
			image,
			schedules,
		},
		{
			params: { id },
		}
	);
	return response;
};
