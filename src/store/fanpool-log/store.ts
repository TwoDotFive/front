import { create } from "zustand";

interface Place {
  name: string;
  address: string;
  thumbnail: string;
  distance: number;
  contentId?: number;
  contentType?: number;
  x: number;
  y: number;
}

interface Memo {
  content?: string;
  images?: { sequence: number; url: string }[];
}

// 팬풀로그 저장시 사용하는 인터페이스
interface Schedule {
  place: Place;
  day: number;
  sequence: number;
  memo?: Memo;
}

// 팬풀로그 상태 타입

interface FanpoologState {
  title: string;
  image: string | null; // 팬풀로그 대표 이미지 (rImage)
  stadiumId: number | null;
  stadiumPosition: { x: number; y: number } | null;
  schedules: Schedule[];
  setTitle: (title: string) => void;
  setImage: (image: string) => void;
  setStadiumId: (stadiumId: number) => void;
  setStadiumPosition: (position: { x: number; y: number }) => void;
  addSchedule: (schedule: Schedule) => void;
  updateSchedule: (index: number, schedule: Schedule) => void;
  removeSchedule: (index: number) => void;
}

const useFanpoologStore = create<FanpoologState>((set) => ({
  title: "",
  image: null,
  stadiumId: null,
  stadiumPosition: null,
  schedules: [],

  setTitle: (title: string) => set({ title }),

  setImage: (image: string) => set({ image }),

  setStadiumId: (stadiumId: number) => set({ stadiumId }),

  setStadiumPosition: (position: { x: number; y: number }) =>
    set({ stadiumPosition: position }),

  addSchedule: (schedule: Schedule) =>
    set((state) => ({ schedules: [...state.schedules, schedule] })),

  updateSchedule: (index: number, schedule: Schedule) =>
    set((state) => {
      const updatedSchedules = [...state.schedules];
      updatedSchedules[index] = schedule;
      return { schedules: updatedSchedules };
    }),

  removeSchedule: (index: number) =>
    set((state) => ({
      schedules: state.schedules.filter((_, i) => i !== index),
    })),
}));

export default useFanpoologStore;
