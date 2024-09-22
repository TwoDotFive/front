import apiClient from '..';

/**
 * 게임 팀 정보 인터페이스
 */
interface Team {
	id: number;
	name: string;
	representativeImageUrl: string;
	stadiumName: string;
	stadiumAliasName: string;
}

/**
 * 게임 정보 인터페이스
 */
interface Game {
	id: number;
	awayTeam: Team;
	homeTeam: Team;
	startDate: string;
	stadium: string;
	state: string;
}

/**
 * 출발지 정보 인터페이스
 */
interface DepartFrom {
	fullText: string;
	zipNo: string;
	sido: string;
	sigungu: string;
	dong: string;
	dongCd: string;
	x: string;
	y: string;
}

/**
 * 팬풀 정보 인터페이스
 */
export interface FanpoolInformation {
	id: number;
	hostUserId: number;
	game: Game;
	title: string;
	departAt: string;
	departFrom: DepartFrom;
	fanpoolType: string;
	fanpoolTypeKor: string;
	genderConstraint: string;
	numberOfPeople: number;
	currentNumberOfPeople: number;
}

/**
 * 팬풀 최신 정보 응답 인터페이스
 */
interface FanpoolLatestResponse {
	fanpoolInformation: FanpoolInformation[];
}

/**
 * 팬풀 최신 정보를 가져오는 함수
 *
 * @returns {Promise<FanpoolLatestResponse>} 팬풀 최신 정보 응답
 */
const getFanpoolLatest = async (): Promise<FanpoolLatestResponse> => {
	const response = await apiClient.get<FanpoolLatestResponse>(
		'/fanpool/latest'
	);
	return response.data;
};

export default getFanpoolLatest;
