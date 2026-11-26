import { useEffect, useRef } from "react";
import { CheckCheck, Loader2 } from "lucide-react";
import { formatChatDateLabel, formatDateTime } from "../../../utils/dateFormatter";
import type { MessageItem, MessageSenderRole } from "../types/message.types";

interface MessageAreaProps {
  messages: MessageItem[];
  currentRole?: MessageSenderRole;
  isLoading?: boolean;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

const CHAT_WALLPAPER_SVG = `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23204066' stroke-opacity='0.065' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M24 30h22a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H32l-7 5v-5h-1a4 4 0 0 1-4-4V34a4 4 0 0 1 4-4z'/%3E%3Cpath d='M115 24l14-4 4 14-14 4z'/%3E%3Ccircle cx='125' cy='31' r='2'/%3E%3Crect x='74' y='66' width='22' height='26' rx='3'/%3E%3Cpath d='M80 74h10M80 80h10M80 86h6'/%3E%3Cpath d='M145 78l10-5 10 5v11l-10 5-10-5z'/%3E%3Cpath d='M145 78l10 5 10-5M155 83v11'/%3E%3Cpath d='M28 118c0-5.5 5-10 11-10s11 4.5 11 10-5 10-11 10c-1.8 0-3.5-.4-5-1.1L28 129l1.8-5.2c-.5-1.8-.8-3.8-.8-5.8z'/%3E%3Cpath d='M104 134l5 5 10-11'/%3E%3Ccircle cx='111' cy='134' r='12'/%3E%3Cpath d='M156 144l2 5 5 2-5 2-2 5-2-5-5-2 5-2z'/%3E%3Ccircle cx='64' cy='26' r='3'/%3E%3Ccircle cx='24' cy='76' r='2.5'/%3E%3Ccircle cx='70' cy='154' r='3'/%3E%3C/g%3E%3C/svg%3E")`;

export function MessageArea({messages,currentRole = "CUSTOMER",isLoading = false,hasMore = false,isLoadingMore = false,onLoadMore}: MessageAreaProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollStateRef = useRef<{ lastId: string | null; prevHeight: number }>({
    lastId: null,
    prevHeight: 0,
  });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const lastId = messages.length > 0 ? messages[messages.length - 1].id : null;

    if (lastId && lastId !== scrollStateRef.current.lastId) {
      container.scrollTop = container.scrollHeight;
    } else if (scrollStateRef.current.prevHeight > 0) {
      const diff = container.scrollHeight - scrollStateRef.current.prevHeight;
      if (diff > 0) {
        container.scrollTop += diff;
      }
      scrollStateRef.current.prevHeight = 0;
    }

    scrollStateRef.current.lastId = lastId;
  }, [messages]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || isLoading || isLoadingMore || !hasMore || !onLoadMore) return;

    if (container.scrollTop < 30) {
      scrollStateRef.current.prevHeight = container.scrollHeight;
      onLoadMore();
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5 sm:space-y-3 bg-[#e6edf5] custom-scrollbar"
      style={{
        backgroundImage: CHAT_WALLPAPER_SVG,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
    >
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-[#2f5581]" />
        </div>
      ) : (
        <>
          {isLoadingMore && (
            <div className="py-2 flex items-center justify-center gap-2 text-slate-500">
              <Loader2 size={15} className="animate-spin text-[#244673]" />
              <span className="text-[11px] font-medium text-slate-400">Loading more...</span>
            </div>
          )}

          {messages.map((msg, index) => {
            const isOwn = msg.senderRole === currentRole;
            const currentGroup = formatChatDateLabel(msg.createdAt);
            const prevGroup =
              index > 0 ? formatChatDateLabel(messages[index - 1].createdAt) : "";
            const showDateBadge = currentGroup !== prevGroup;

            return (
              <div key={msg.id} className="space-y-2.5 sm:space-y-3">
                {showDateBadge && currentGroup && (
                  <div className="flex justify-center my-2">
                    <span className="px-3.5 py-1 bg-white text-slate-600 text-[11px] font-medium rounded-full border border-slate-200 shadow-2xs">
                      {currentGroup}
                    </span>
                  </div>
                )}

                {isOwn ? (
                  <div className="flex justify-end ml-auto max-w-[85%] sm:max-w-md lg:max-w-lg">
                    <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-tr-xs bg-[#2f5581] text-white text-xs sm:text-[13.5px] shadow-[0_1px_2px_rgba(47,85,129,0.2)]">
                      {msg.type === "IMAGE" && msg.mediaUrl && (
                        <img
                          src={msg.mediaUrl}
                          alt="Attachment"
                          className="rounded-xl max-h-64 w-auto object-cover mb-1.5"
                        />
                      )}
                      {msg.content && (
                        <p className="text-left leading-relaxed whitespace-pre-wrap break-words">
                          {msg.content}
                        </p>
                      )}
                      <div className="flex items-center justify-end gap-1 mt-1 -mb-0.5 text-blue-100/75 select-none">
                        <span className="text-[10px] sm:text-[10.5px] font-normal leading-none">
                          {formatDateTime(msg.createdAt).time}
                        </span>
                        <CheckCheck
                          size={13}
                          className={msg.isRead ? "text-sky-300" : "text-blue-200/60"}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start mr-auto max-w-[85%] sm:max-w-md lg:max-w-lg">
                    <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-tl-xs bg-white text-slate-800 text-xs sm:text-[13.5px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-slate-200/70">
                      {msg.type === "IMAGE" && msg.mediaUrl && (
                        <img
                          src={msg.mediaUrl}
                          alt="Attachment"
                          className="rounded-xl max-h-64 w-auto object-cover mb-1.5"
                        />
                      )}
                      {msg.content && (
                        <p className="text-left leading-relaxed whitespace-pre-wrap break-words">
                          {msg.content}
                        </p>
                      )}
                      <div className="flex items-center justify-end mt-1 -mb-0.5 text-slate-400 select-none">
                        <span className="text-[10px] sm:text-[10.5px] font-normal leading-none">
                          {formatDateTime(msg.createdAt).time}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default MessageArea;
