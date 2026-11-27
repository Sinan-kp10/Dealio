import { useEffect } from "react";
import useAuthStore from "../stores/auth.store";
import socket from "../services/socket.service";
import useNotificationStore from "../stores/notification.store";
import { playChatMessageSound, playNotificationSound } from "../utils/soundUtils";

function useSocketConnection(): void {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);
    const incrementUnreadCount = useNotificationStore((state) => state.incrementUnreadCount);

    useEffect(() => {
        if (isLoading || !isAuthenticated) {
            if (socket.connected) {
                socket.disconnect();
            }
            return;
        }

        const handleNewNotification = () => {
            incrementUnreadCount();
            void playNotificationSound();
        };

        const handleIncomingChatSound = () => {
            void playChatMessageSound();
        };

        socket.on("notification:new", handleNewNotification);
        socket.on("chat:list_update", handleIncomingChatSound);

        if (!socket.connected) {
            socket.connect();
        }

        return () => {
            socket.off("notification:new", handleNewNotification);
            socket.off("chat:list_update", handleIncomingChatSound);
        };
    }, [isAuthenticated, isLoading, incrementUnreadCount]);
}

export default useSocketConnection;
