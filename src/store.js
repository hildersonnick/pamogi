import { create } from "zustand";

const useStore = create((set) => (
  {
  mockData: [],
  setMockData: (data) => { set({ mockData: data })},
}));

export default useStore;
