import { useState, useEffect, useRef } from "react";
import { BellOff, Check, CheckCheck, Loader2 } from "lucide-react";
import {getNotifications,getUnreadCount,markNotificationAsRead,markAllNotificationsAsRead} from "../../services/notification.service";
import type { NotificationItem } from "../../types/notification.types";
import useNotificationStore from "../../stores/notification.store";
import { handleApiError } from "../../utils/errorHandler";
import { formatTimeAgo } from "../../utils/dateFormatter";

const PAGE_LIMIT = 8;

export function NotificationDropdown() {
  const [activeTab, setActiveTab] = useState<"unread" | "all">("unread");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);
  const decrementUnreadCount = useNotificationStore((state) => state.decrementUnreadCount);
  const resetUnreadCount = useNotificationStore((state) => state.resetUnreadCount);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      try {
        const count = await getUnreadCount();
        if (isMounted) {
          setUnreadCount(count);
        }
      } catch (error) {
        if (isMounted) {
          handleApiError(error, "Failed to fetch unread count");
        }
      }
    };

    void fetchCount();

    return () => {
      isMounted = false;
    };
  }, [setUnreadCount]);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialNotifications = async () => {
      try {
        const data = await getNotifications({
          isRead: activeTab === "unread" ? false : undefined,
          limit: PAGE_LIMIT,
        });

        if (isMounted) {
          setNotifications(data.items);
          setNextCursor(data.nextCursor);
          setHasMore(data.hasMore);
        }
      } catch (error) {
        if (isMounted) {
          handleApiError(error, "Failed to load notifications");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchInitialNotifications();

    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  const handleTabChange = (tab: "unread" | "all") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setLoading(true);
    setNotifications([]);
    setNextCursor(null);
    setHasMore(false);
  };

  const handleLoadMore = async () => {
    if (loading || loadingMore || !hasMore || !nextCursor) return;

    setLoadingMore(true);
    try {
      const data = await getNotifications({
        isRead: activeTab === "unread" ? false : undefined,
        cursor: nextCursor,
        limit: PAGE_LIMIT,
      });

      setNotifications((prev) => [...prev, ...data.items]);
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (error) {
      handleApiError(error, "Failed to load more notifications");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight < 30) {
      void handleLoadMore();
    }
  };

  const handleMarkAsRead = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    decrementUnreadCount();

    try {
      await markNotificationAsRead(id);
    } catch (error) {
      handleApiError(error, "Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    resetUnreadCount();

    try {
      await markAllNotificationsAsRead();
    } catch (error) {
      handleApiError(error, "Failed to mark all notifications as read");
    }
  };

  const filteredNotifications = activeTab === "unread" ? notifications.filter((n) => !n.isRead) : notifications;

  return (
    <div
      className="absolute right-0 mt-3 w-[calc(100vw-2rem)] sm:w-[410px] max-w-[420px] bg-white rounded-[22px] shadow-[0_16px_40px_-8px_rgba(15,23,42,0.14),0_4px_16px_rgba(15,23,42,0.06)] border border-slate-200/90 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 origin-top-right"
      role="dialog"
      aria-label="Notifications panel"
    >
      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between bg-white">
        <h3 className="text-[15px] font-bold text-[#0e2238] tracking-[-0.01em]">
          Notifications
        </h3>
      </div>

      <div className="px-4 py-2 bg-[#f8fafc]/70 border-b border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleTabChange("unread")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer select-none focus:outline-none ${
              activeTab === "unread"
                ? "bg-[#244673] text-white shadow-2xs"
                : "bg-[#f0f4f9] text-slate-700 hover:bg-[#e4ecf5] hover:text-slate-900"
            }`}
          >
            <span>Unread</span>
            <span
              className={`inline-flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[10px] rounded-full font-bold leading-none ${
                activeTab === "unread"
                  ? "bg-white/20 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer select-none focus:outline-none ${
              activeTab === "all"
                ? "bg-[#244673] text-white shadow-2xs"
                : "bg-[#f0f4f9] text-slate-700 hover:bg-[#e4ecf5] hover:text-slate-900"
            }`}
          >
            <span>All</span>
          </button>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#244673] hover:text-[#183252] hover:bg-[#f0f6fc] px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Mark all notifications as read"
          >
            <CheckCheck size={14} strokeWidth={2.2} />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="max-h-[340px] overflow-y-auto pl-2.5 pr-1.5 py-2.5 space-y-2 overscroll-contain custom-scrollbar"
      >
        {loading ? (
          <div className="space-y-2 p-1 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-3.5 py-3 rounded-xl border border-slate-100 bg-slate-50/60">
                <div className="flex items-center justify-between gap-2.5 mb-2">
                  <div className="h-3.5 bg-slate-200 rounded w-2/3" />
                  <div className="h-2.5 bg-slate-200 rounded w-12" />
                </div>
                <div className="h-3 bg-slate-200/70 rounded w-full mb-1.5" />
                <div className="h-3 bg-slate-200/70 rounded w-4/5" />
              </div>
            ))}
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="py-10 px-4 text-center flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-[#f0f6fc] text-[#244673] flex items-center justify-center mb-2.5">
              <BellOff size={20} strokeWidth={2} />
            </div>
            <p className="text-xs font-bold text-slate-800 mb-0.5">
              {activeTab === "unread" ? "No unread notifications" : "No notifications yet"}
            </p>
            <p className="text-[11px] text-slate-500 max-w-[220px] leading-relaxed">
              {activeTab === "unread"
                ? "You're all caught up! Check back later for updates."
                : "Activity and verification updates will appear here."}
            </p>
          </div>
        ) : (
          <>
            {filteredNotifications.map((item) => (
              <div
                key={item.id}
                className={`px-3.5 py-2.5 rounded-xl border transition-colors ${
                  !item.isRead
                    ? "bg-[#f8fbfe] border-[#dce8f5] shadow-2xs"
                    : "bg-white border-slate-200/70"
                }`}
              >
                <div className="flex items-center justify-between gap-2.5">
                  <p className="text-[12.5px] font-bold text-[#0e2238] leading-tight truncate">
                    {item.title}
                  </p>

                  <span className="text-[11px] font-medium text-slate-400 shrink-0">
                    {formatTimeAgo(item.createdAt)}
                  </span>
                </div>

                <p className="text-[11.5px] text-slate-600 leading-snug mt-1 line-clamp-2">
                  {item.message}
                </p>

                {!item.isRead && (
                  <div className="flex justify-end mt-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleMarkAsRead(item.id, e)}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10.5px] font-semibold text-white bg-[#244673] hover:bg-[#183252] rounded-full transition-colors cursor-pointer shadow-2xs"
                      title="Mark as read"
                    >
                      <Check size={11} strokeWidth={2.4} />
                      <span>Mark as read</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {loadingMore && (
              <div className="py-2 flex items-center justify-center gap-2 text-slate-500">
                <Loader2 size={15} className="animate-spin text-[#244673]" />
                <span className="text-[11px] font-medium text-slate-400">Loading more...</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
