import { create } from "zustand";
import type { ActiveCategory } from "../types/category.types";

interface CategoryState {
    categories: ActiveCategory[];
    isLoading: boolean;
    setCategories: (categories: ActiveCategory[]) => void;
    setLoading: (isLoading: boolean) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    isLoading: false,

    setCategories: (categories) =>
        set({
            categories,
            isLoading: false,
        }),

    setLoading: (isLoading) => set({ isLoading }),
}));

export default useCategoryStore;
