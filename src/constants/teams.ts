export interface teamsType {
	code: string;
	name: string;
	area: string;
}
export const teams: teamsType[] = [
	{ code: 'doosan', name: '두산 베어스', area: '잠실' }, // 잠실야구장
	{ code: 'hanwha', name: '한화 이글스', area: '대전' }, // 대전 한화생명 이글스파크
	{ code: 'kiwoom', name: '키움 히어로즈', area: '고척' }, // 고척 스카이돔
	{ code: 'kia', name: '기아 타이거즈', area: '광주' }, // 광주 기아 챔피언스 필드
	{ code: 'kt', name: 'KT 위즈', area: '수원' }, // 수원 KT 위즈파크
	{ code: 'lg', name: 'LG 트윈스', area: '잠실' }, // 잠실야구장
	{ code: 'lotte', name: '롯데 자이언츠', area: '부산' }, // 사직야구장
	{ code: 'nc', name: 'NC 다이노스', area: '창원' }, // 창원NC파크
	{ code: 'ssg', name: 'SSG 랜더스', area: '인천' }, // 인천 SSG 랜더스필드
	{ code: 'samsung', name: '삼성 라이온즈', area: '대구' }, // 대구 삼성 라이온즈 파크
];
