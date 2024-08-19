export const fanfoolType = {
	CAR_SHARE: {
		NAME: '차량공유',
		TEXT_COLOR: 'kboBlue500',
		BG_COLOR: 'kboBlue0',
	},
	TAXI_PARTY: {
		NAME: '택시팟',
		TEXT_COLOR: 'gray600',
		BG_COLOR: 'gray100',
	},
	ANY: {
		NAME: '성별무관',
		TEXT_COLOR: 'text-gray600',
		BG_COLOR: 'bg-gray100',
	},

	FEMALE_ONLY: {
		NAME: '여자만',
		TEXT_COLOR: 'text-gray600',
		BG_COLOR: 'bg-gray100',
	},

	MALE_ONLY: {
		NAME: '남자만',
		TEXT_COLOR: 'text-gray600',
		BG_COLOR: 'bg-gray100',
	},
} as const;

export type FanFoolType = keyof typeof fanfoolType;
