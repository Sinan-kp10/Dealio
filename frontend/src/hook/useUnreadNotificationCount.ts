import { useEffect } from "react";
import useNotificationStore from "../stores/notification.store";
import { getUnreadCount } from "../services/notification.service";

export function useUnreadNotificationCount() {
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      try {
        const count = await getUnreadCount();
        if (isMounted) {
          setUnreadCount(count);
        }
      } catch {
      }
    };

    fetchCount();
    return () => {
      isMounted = false;
    };
  }, [setUnreadCount]);

  return unreadCount;
}
