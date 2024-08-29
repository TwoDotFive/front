import React from 'react';
import { Text } from '../Text';
import colors from '../../../styles/palette';
import { Tags, tags } from '@/constants/tags';

type TagProps = {
	type: Tags;
};

export const TagFanPool = ({ type }: TagProps) => {
	/**
	 * 정의된 fanpoolType 가져오기
	 */
	const { TEXT_COLOR, BG_COLOR, NAME } = tags[type];

	/**
	 * textColor,bgColor을 사용하기 위해 정의
	 */
	const textColor = colors[TEXT_COLOR as keyof typeof colors];
	const bgColor = colors[BG_COLOR as keyof typeof colors];

	return (
		<div
			className="w-fit h-fit px-6pxr py-2pxr rounded-4pxr"
			style={{
				color: textColor,
				backgroundColor: bgColor,
			}}
		>
			<Text fontSize={12} fontWeight={600}>
				{NAME}
			</Text>
		</div>
	);
};
