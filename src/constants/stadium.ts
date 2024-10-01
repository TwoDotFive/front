// staidumId에 따라 경기장 이름 및 주소 반환해주는 객체

export const stadiumMap = new Map<string, number>([
  ["잠실", 1],
  ["수원", 2],
  ["문학", 3],
  ["창원", 4],
  ["광주", 5],
  ["사직", 6],
  ["대구", 7],
  ["대전", 8],
  ["고척", 9],
]);

export const reverseStadiumMap = new Map<string, string>([
  ["1", "잠실"],
  ["2", "수원"],
  ["3", "문학"],
  ["4", "창원"],
  ["5", "광주"],
  ["6", "사직"],
  ["7", "대구"],
  ["8", "대전"],
  ["9", "고척"],
]);
