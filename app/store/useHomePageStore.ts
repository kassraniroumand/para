import { create } from 'zustand';
import { HomepageData } from '@/types/homepage';

interface HomePageState {
    homepage: HomepageData | null;
    setHomepage: (data: HomepageData) => void;
}

export const useHomePageStore = create<HomePageState>((set) => ({
    homepage: null,
    setHomepage: (data) => set({ homepage: data }),
}));