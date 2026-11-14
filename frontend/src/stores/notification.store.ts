import { create } from "zustand";

interface NotificationState {
    unreadCount: number;
    setUnreadCount: (count: number) => void;
    decrementUnreadCount: () => void;
    resetUnreadCount: () => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
    unreadCount: 0,

    setUnreadCount: (unreadCount) => set({ unreadCount }),

    decrementUnreadCount: () =>
        set((state) => ({
            unreadCount: Math.max(0, state.unreadCount - 1),
        })),

    resetUnreadCount: () => set({ unreadCount: 0 }),
}));

export default useNotificationStore;
