export const fanpoolType = {
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
		TEXT_COLOR: 'gray600',
		BG_COLOR: 'gray100',
	},

	FEMALE_ONLY: {
		NAME: '여성만',
		TEXT_COLOR: 'fireRed400',
		BG_COLOR: 'fireRed100',
	},

	MALE_ONLY: {
		NAME: '남성만',
		TEXT_COLOR: 'kboBlue500',
		BG_COLOR: 'kboBlue0',
	},
	AWAY: {
		NAME: 'AWAY',
		TEXT_COLOR: 'activeLylac600',
		BG_COLOR: 'activeLylac100',
	},
	HOME: {
		NAME: 'HOME',
		TEXT_COLOR: 'earthGreen500',
		BG_COLOR: 'earthGreen0',
	},
} as const;

export type FanPoolType = keyof typeof fanpoolType;
