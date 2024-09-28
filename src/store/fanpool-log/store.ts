import { create } from "zustand";

interface Place {
  name: string;
  address: string;
  thumbnail: string;
  distance: number;
  contentId: number;
  contentType: string;
  x: number;
  y: number;
}

export interface Memo {
  content?: string;
  images?: { sequence: number; url: string }[];
}

// 팬풀로그 저장시 사용하는 인터페이스
export interface Schedule {
  place: Place;
  day: number;
  sequence: number;
  memo?: Memo;
}

// 팬풀로그 상태 타입

interface FanpoologState {
  title: string;
  image: File | string | null; // 팬풀로그 대표 이미지 (rImage)
  stadiumId: number | null;
  stadiumPosition: { x: number; y: number } | null;
  schedules: Schedule[];
  fanpoolLogId: string | null;
  setTitle: (title: string) => void;
  setImage: (image: File | string) => void;
  setStadiumId: (stadiumId: number) => void;
  setStadiumPosition: (position: { x: number; y: number }) => void;
  setFanpoolLogId: (fanpoolLogId: string) => void;
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
  fanpoolLogId: null,

  setTitle: (title: string) => set({ title }),

  setImage: (image: File | string) => set({ image }),

  setStadiumId: (stadiumId: number) => set({ stadiumId }),

  setStadiumPosition: (position: { x: number; y: number }) =>
    set({ stadiumPosition: position }),

  setFanpoolLogId: (fanpoolLogId: string) => set({ fanpoolLogId }),

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
