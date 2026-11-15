import { Search } from "lucide-react";
import type { ConversationItem } from "../../types/conversation.types";

interface ConversationListProps {
  conversations: ConversationItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  filterTab: "all" | "unread";
  onFilterChange: (tab: "all" | "unread") => void;
  className?: string;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  filterTab,
  onFilterChange,
  className = "",
}: ConversationListProps) {
  const filteredConversations = conversations.filter((item) =>
    filterTab === "unread" ? item.unread : true
  );

  return (
    <aside
      className={`w-full md:w-80 lg:w-[350px] xl:w-[380px] shrink-0 border-r border-slate-200/80 flex flex-col bg-white h-full ${className}`}
      aria-label="Conversations List"
    >
      {/* Search Bar & Filter Tabs */}
      <div className="p-3.5 sm:p-4 bg-[#f8fafc] border-b border-slate-200/80 space-y-3 shrink-0">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            readOnly
            placeholder="Search conversations..."
            className="w-full h-10 pl-9 pr-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200/90 rounded-xl focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
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
            <span
              className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center leading-none ${
                filterTab === "unread"
                  ? "bg-white text-[#2f5581]"
                  : "bg-[#2f5581] text-white"
              }`}
            >
              1
            </span>
          </button>
        </div>
      </div>

      {/* Scrollable Conversation Items with custom slim scrollbar */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100/80 custom-scrollbar">
        {filteredConversations.map((item) => {
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
              {/* Active Indicator Line */}
              {isSelected && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#2f5581] rounded-r" />
              )}

              {/* Profile Avatar Icon */}
              <div className="w-10 h-10 rounded-full bg-[#2f5581] flex items-center justify-center text-white shrink-0 shadow-xs overflow-hidden">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-xs sm:text-[13.5px] font-bold text-slate-800 truncate">
                    {item.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                    {item.timestamp}
                  </span>
                </div>

                {/* Last message preview */}
                <p className="mt-1 text-[11.5px] text-slate-400 truncate">
                  {item.lastMessage}
                </p>
              </div>

              {/* Unread Indicator Dot */}
              {item.unread && (
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default ConversationList;
