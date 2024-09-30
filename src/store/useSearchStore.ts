import { create } from 'zustand';

interface SearchStore {
	selectedMatches: string[]; // 선택된 경기 ID들
	selectedDate: Date; // 선택된 날짜
	selectedTeam: string; // 선택된 팀 ID
	selectedPlace: { name: string; id: string; x: string; y: string } | null; // 선택된 장소 정보
	isCheckDeadline: boolean; // 마감된 팬풀 숨기기 여부
	setSelectedMatches: (matches: string[]) => void; // 선택된 경기 설정
	setSelectedDate: (date: Date) => void; // 선택된 날짜 설정
	setSelectedTeam: (teamId: string) => void; // 선택된 팀 설정
	setSelectedPlace: (
		place: {
			name: string;
			id: string;
			x: string;
			y: string;
		} | null
	) => void; // 선택된 장소 설정
	toggleCheckDeadline: () => void; // 마감된 팬풀 숨기기 토글
	resetFilters: () => void; // 필터 초기화
}

// Zustand 스토어 생성
export const useSearchStore = create<SearchStore>((set) => ({
	selectedMatches: [], // 초기값: 빈 배열
	selectedDate: new Date(), // 초기값: 오늘 날짜
	selectedTeam: '', // 초기값: 선택되지 않음
	selectedPlace: null, // 초기값: 선택되지 않음
	isCheckDeadline: true, // 초기값: 마감된 팬풀 숨기기 활성화

	// 선택된 경기 설정 함수
	setSelectedMatches: (matches) => set({ selectedMatches: matches }),

	// 선택된 날짜 설정 함수
	setSelectedDate: (date) => set({ selectedDate: date }),

	// 선택된 팀 설정 함수
	setSelectedTeam: (teamId) => set({ selectedTeam: teamId }),

	// 선택된 장소 설정 함수
	setSelectedPlace: (place) => set({ selectedPlace: place }),

	// 마감된 팬풀 숨기기 토글 함수
	toggleCheckDeadline: () =>
		set((state) => ({ isCheckDeadline: !state.isCheckDeadline })),

	// 필터 초기화 함수
	resetFilters: () =>
		set({
			selectedMatches: [],
			selectedDate: new Date(),
			selectedTeam: '',
			selectedPlace: null,
			isCheckDeadline: true,
		}),
}));
