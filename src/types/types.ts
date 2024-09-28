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

export interface FanpoolLogList {
  id: string;
  image: string;
  title: string;
  stadium: string;
  profile: {
    nickname: string;
    image: string;
  };
  places: string;
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
