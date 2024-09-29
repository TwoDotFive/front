import getUserProfile from '@/api/user/getUserProfile';
import { UserProfileResponse } from '@/types/types';
import { create } from 'zustand';

// Zustand 스토어 정의
interface UserStore {
	userProfile: UserProfileResponse | null; // 사용자 프로필 상태
	setUserProfile: (profile: UserProfileResponse) => void; // 사용자 프로필 설정 함수
	clearUserProfile: () => void; // 사용자 프로필 초기화 함수
	fetchUserProfile: (userId: string) => Promise<void>; // 사용자 프로필을 가져오는 함수
}

export const useUserStore = create<UserStore>((set) => ({
	userProfile: null,

	// 사용자 프로필 설정 함수
	setUserProfile: (profile: UserProfileResponse) =>
		set({ userProfile: profile }),

	// 사용자 프로필 초기화 함수
	clearUserProfile: () => set({ userProfile: null }),

	// 사용자 프로필을 API로부터 가져오는 함수
	fetchUserProfile: async (userId: string) => {
		try {
			const response = await getUserProfile({ userId });
			localStorage.setItem('userId', response.id);
			set({ userProfile: response });
		} catch (error) {
			console.error('Failed to fetch user profile:', error);
		}
	},
}));
