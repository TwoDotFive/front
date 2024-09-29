export interface Team {
	id: number;
	name: string;
	representativeImageUrl: string;
	stadiumName: string;
	stadiumAliasName: string;
}

export interface Game {
	id: number;
	awayTeam: Team;
	homeTeam: Team;
	startDate: string;
	stadium: string;
	state?: string;
}

export interface Location {
	fullText: string;
	zipNo: string;
	sido: string;
	sigungu: string;
	dong: string;
	dongCd: string;
	x: string;
	y: string;
}

export interface FanpoolInformation {
	id: number;
	title: string;
	hostUserId: number;
	game: Game;
	departAt: string;
	departFrom: Location;
	fanpoolType: string;
	fanpoolTypeKor: string;
	genderConstraint: string;
	numberOfPeople: number;
	currentNumberOfPeople: number;
}

export interface FanpoolType {
	fanpoolInformation: FanpoolInformation;
}

/**
 * 즐겨찾는 팀 정보
 *
 * id 팀 ID
 * name 팀 이름
 * representativeImageUrl 팀 대표 이미지 URL
 * stadiumName 경기장 이름
 * stadiumAliasName 경기장 별칭
 */
export interface FavoriteTeam {
	id: string;
	name: string;
	representativeImageUrl: string;
	stadiumName: string;
	stadiumAliasName: string;
}

/**
 * 사용자 프로필
 *
 * email 사용자 이메일
 * nickname 사용자 닉네임
 * profileImageUrl 사용자 프로필 이미지 URL
 * name 사용자 이름
 * oneLiner 사용자 자기소개
 * userRole 사용자 역할
 * favoritTeam 사용자가 즐겨찾는 팀 정보
 * hostedFanpoolNumber 사용자가 호스트한 팬풀 수
 */
export interface UserProfileResponse {
	id: string;
	email: string;
	nickname: string;
	profileImageUrl: string;
	name: string;
	oneLiner: string;
	userRole: string;
	favoriteTeam: FavoriteTeam;
	hostedFanpoolNumber: number;
	hostedTourLogNumber: number;
}

export interface FanpoolLogList {
	id: string;
	image: string;
	title: string;
	stadium: string;
	profile: {
		nickname: string;
		image: string;
	};
	locations: string[];
}

export interface PlaceContent {
	checkInTime: string | null;
	checkOutTime: string | null;
	contentId: number;
	contentType: number;
	fee: number | null;
	firstMenu: string | null;
	infoCenter: string | null;
	openTime: string | null;
	parking: string | null;
	restDate: string | null;
	reservervationPageUrl: string | null;
	restroom: string | null;
	treatMenu: string | null;
}
