import { useEffect } from "react";
import useAuthStore from "../stores/auth.store";
import socket from "../services/socket.service";
import useNotificationStore from "../stores/notification.store";

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
        };

        socket.on("notification:new", handleNewNotification);

        if (!socket.connected) {
            socket.connect();
        }

        return () => {
            socket.off("notification:new", handleNewNotification);
        };
    }, [isAuthenticated, isLoading, incrementUnreadCount]);
}

export default useSocketConnection;
