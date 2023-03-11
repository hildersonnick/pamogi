import { create } from 'zustand';

const useStore = create((set) => ({
    mockData: [],
    setMockData: (data) => set({ mockData: data }),
    topicIndex: 0,
    setTopicIndex: (index) => set({ topicIndex: index }),
    subtopicIndex: 0,
    setSubtopicIndex: (index) => set({ subtopicIndex: index }),
    taskIndex: 0,
    setTaskIndex: (index) => set({ taskIndex: index })
}));

export default useStore;
