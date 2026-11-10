import { useEffect } from "react";
import useCategoryStore from "../stores/category.store";
import { getActiveCategories } from "../services/category.service";
import { handleApiError } from "../utils/errorHandler";

function useActiveCategories(): void {
    const categories = useCategoryStore((state) => state.categories);
    const setCategories = useCategoryStore((state) => state.setCategories);
    const setLoading = useCategoryStore((state) => state.setLoading);

    useEffect(() => {
        if (categories.length > 0) return;

        let cancelled = false;

        const loadCategories = async () => {
            setLoading(true);
            try {
                const response = await getActiveCategories();
                if (!cancelled) {
                    setCategories(response.data);
                }
            } catch (error) {
                handleApiError(error, "Unable to load categories");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void loadCategories();

        return () => {
            cancelled = true;
        };
    }, [categories.length, setCategories, setLoading]);
}

export const refreshActiveCategories = async (): Promise<void> => {
    try {
        const response = await getActiveCategories();
        useCategoryStore.getState().setCategories(response.data);
    } catch (error) {
        handleApiError(error, "Unable to refresh categories");
    }
};

export default useActiveCategories;
