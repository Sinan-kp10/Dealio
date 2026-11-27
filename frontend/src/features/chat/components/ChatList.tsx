import { useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import type { ChatFilterTab, ChatListItem } from "../types/chat.types";
import { formatTimeAgo } from "../../../utils/dateFormatter";
import { ChatAvatar } from "./ChatAvatar";

interface ChatListProps {
  chats: ChatListItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  filterTab: ChatFilterTab;
  onFilterChange: (tab: ChatFilterTab) => void;
  search: string;
  onSearchChange: (value: string) => void;
  totalUnreadChats: number;
  isLoading: boolean;
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  className?: string;
}

export function ChatList({
  chats,
  selectedId,
  onSelect,
  filterTab,
  onFilterChange,
  search,
  onSearchChange,
  totalUnreadChats,
  isLoading,
  hasMore,
  isLoadingMore,
  onLoadMore,
  className = "",
}: ChatListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || isLoading || isLoadingMore || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight < 30) {
      onLoadMore();
    }
  };

  return (
    <aside
      className={`w-full md:w-80 lg:w-[350px] xl:w-[380px] shrink-0 border-r border-slate-200 flex flex-col bg-white h-full ${className}`}
      aria-label="Chats List"
    >
      <div className="p-3.5 sm:p-4 bg-[#f8fafc] border-b border-slate-200 space-y-3 shrink-0">
        <div className="relative">
          <Search
            size={16}
            className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search chats..."
            aria-label="Search chats"
            className="w-full h-10 pl-10 pr-3.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-2xs transition-colors [&::-webkit-search-cancel-button]:cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onFilterChange("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filterTab === "all"
                ? "bg-[#2f5581] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/70 font-medium"
            }`}
          >
            All Chats
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("unread")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
              filterTab === "unread"
                ? "bg-[#2f5581] text-white font-semibold shadow-xs"
                : "text-slate-600 hover:bg-slate-200/70 font-medium"
            }`}
          >
            <span>Unread</span>
            {totalUnreadChats > 0 && (
              <span
                className={`min-w-4 h-4 px-1 rounded-full text-[10px] font-bold flex items-center justify-center leading-none ${
                  filterTab === "unread"
                    ? "bg-white text-[#2f5581]"
                    : "bg-[#2f5581] text-white"
                }`}
              >
                {totalUnreadChats}
              </span>
            )}
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto divide-y divide-slate-100/80 custom-scrollbar"
      >
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="h-3.5 bg-slate-200 rounded w-1/2" />
                  <div className="h-3 bg-slate-100 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : chats.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <p className="text-sm font-semibold text-slate-600">
              {filterTab === "unread"
                ? "No unread chats"
                : search.trim()
                ? "No matching chats found"
                : "No chats yet"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {filterTab === "unread"
                ? "You're all caught up."
                : "Your chats with seller will appear here."}
            </p>
          </div>
        ) : (
          <>
            {chats.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={`w-full p-3.5 sm:p-4 flex items-start gap-3 text-left transition-colors cursor-pointer relative ${
                    isSelected ? "bg-[#edf4fb]" : "hover:bg-slate-50/80"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#2f5581] rounded-r" />
                  )}

                  <ChatAvatar name={item.name} avatarUrl={item.avatarUrl} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xs sm:text-[13.5px] font-bold text-slate-800 truncate">
                        {item.name}
                      </h3>
                      {item.lastMessageAt && (
                        <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                          {formatTimeAgo(item.lastMessageAt)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className="text-[11.5px] text-slate-500 truncate">
                        {item.lastMessageText || "No messages yet"}
                      </p>
                      {item.unreadCount > 0 && (
                        <span className="min-w-4.5 h-4.5 px-1.5 rounded-full bg-[#2f5581] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {item.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}

            {isLoadingMore && (
              <div className="py-3 flex items-center justify-center gap-2 text-slate-500">
                <Loader2 size={15} className="animate-spin text-[#244673]" />
                <span className="text-[11px] font-medium text-slate-400">Loading more...</span>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}

export default ChatList;
