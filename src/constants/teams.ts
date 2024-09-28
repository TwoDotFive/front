export interface teamsType {
	id: number;
	code: string;
	name: string;
	stadiumAliasName: string;
	stadiumName: string;
	representativeImageUrl?: string;
}

export const teams: teamsType[] = [
	{
		id: 1,
		code: 'lg',
		name: 'LG 트윈스',
		stadiumAliasName: '잠실',
		stadiumName: '잠실종합운동장 잠실야구장',
	}, // 잠실야구장
	{
		id: 2,
		code: 'kt',
		name: 'KT 위즈',
		stadiumAliasName: '수원',
		stadiumName: '수원 KT 위즈파크',
	}, // 수원 KT 위즈파크
	{
		id: 3,
		code: 'ssg',
		name: 'SSG 랜더스',
		stadiumAliasName: '문학',
		stadiumName: '인천 SSG 랜더스필드',
	}, // 인천 SSG 랜더스필드
	{
		id: 4,
		code: 'nc',
		name: 'NC 다이노스',
		stadiumAliasName: '창원',
		stadiumName: '창원 NC 파크',
	}, // 창원 NC 파크
	{
		id: 5,
		code: 'doosan',
		name: '두산 베어스',
		stadiumAliasName: '잠실',
		stadiumName: '잠실종합운동장 잠실야구장',
	}, // 잠실야구장
	{
		id: 6,
		code: 'kia',
		name: 'KIA 타이거즈',
		stadiumAliasName: '광주',
		stadiumName: '광주-기아 챔피언스필드',
	}, // 광주-기아 챔피언스필드
	{
		id: 7,
		code: 'lotte',
		name: '롯데 자이언츠',
		stadiumAliasName: '사직',
		stadiumName: '사직종합운동장 사직야구장',
	}, // 사직야구장
	{
		id: 8,
		code: 'samsung',
		name: '삼성 라이온즈',
		stadiumAliasName: '대구',
		stadiumName: '대구 삼성라이온즈파크',
	}, // 대구 삼성라이온즈파크
	{
		id: 9,
		code: 'hanwha',
		name: '한화 이글스',
		stadiumAliasName: '대전',
		stadiumName: '한화이글스파크',
	}, // 대전 한화이글스파크
	{
		id: 10,
		code: 'kiwoom',
		name: '키움 히어로즈',
		stadiumAliasName: '고척',
		stadiumName: '고척스카이돔',
	}, // 고척스카이돔
];
