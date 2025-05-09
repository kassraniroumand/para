import { create } from 'zustand';
import {HomepageData, PortfolioPage} from "@/app/types";

export interface HomePageState {
    homepage: HomepageData | null;
    setHomepage: (data: HomepageData) => void;
}

export const useHomePageStore = create<HomePageState>((set) => ({
    homepage: null,
    setHomepage: (data) => set({ homepage: data }),
}));


export interface PortfolioState {
    portfolio: PortfolioPage | null;
    setPortfolioPage: (data: PortfolioPage) => void;
}

export const usePortfolioPageStore = create<PortfolioState>((set) => ({
    portfolio: null,
    setPortfolioPage: (data) => set({ portfolio: data }),
}))

