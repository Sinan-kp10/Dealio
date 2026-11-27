import { useRef, useState } from "react";
import { CheckCheck, Loader2 } from "lucide-react";
import { formatChatDateLabel, formatDateTime } from "../../../utils/dateFormatter";
import { isEmojiOnlyMessage } from "../utils/emoji.utils";
import { ChatImageModal } from "./ChatImageModal";
import type { MessageItem, MessageSenderRole } from "../types/message.types";

interface MessageAreaProps {
  messages: MessageItem[];
  currentRole?: MessageSenderRole;
  isLoading?: boolean;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

export function MessageArea({
  messages,
  currentRole = "CUSTOMER",
  isLoading = false,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: MessageAreaProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || isLoading || isLoadingMore || !hasMore || !onLoadMore) return;

    const scrolledUpDistance = Math.abs(container.scrollTop);
    if (scrolledUpDistance + container.clientHeight >= container.scrollHeight - 40) {
      onLoadMore();
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col-reverse gap-2.5 sm:gap-3 custom-scrollbar"
    >
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-[#2f5581]" />
        </div>
      ) : (
        <>
          {messages.map((msg, index) => {
            const isOwn = msg.senderRole === currentRole;
            const currentGroup = formatChatDateLabel(msg.createdAt);
            const olderGroup =
              index < messages.length - 1
                ? formatChatDateLabel(messages[index + 1].createdAt)
                : "";
            const showDateBadge = currentGroup !== olderGroup;
            const hasImage = msg.type === "IMAGE" && Boolean(msg.mediaUrl);
            const hasContent = Boolean(msg.content);
            const isEmojiOnly = !hasImage && isEmojiOnlyMessage(msg.content);

            const bubbleCorner = isOwn ? "rounded-tr-xs" : "rounded-tl-xs";
            const bubbleTheme = isOwn
              ? "bg-[#2f5581] text-white shadow-[0_1px_2px_rgba(47,85,129,0.2)]"
              : "bg-white text-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-slate-200/70";
            const metaColor = isOwn ? "text-blue-100/75" : "text-slate-400";

            return (
              <div key={msg.id} className="flex flex-col gap-2.5 sm:gap-3">
                {showDateBadge && currentGroup && (
                  <div className="flex justify-center my-2">
                    <span className="px-3.5 py-1 bg-white text-slate-600 text-[11px] font-medium rounded-full border border-slate-200 shadow-2xs">
                      {currentGroup}
                    </span>
                  </div>
                )}

                <div
                  className={`flex max-w-[85%] sm:max-w-md lg:max-w-lg ${
                    isOwn ? "justify-end ml-auto" : "justify-start mr-auto"
                  }`}
                >
                  {isEmojiOnly ? (
                    <div className={`flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
                      <span className="text-4xl sm:text-5xl leading-none px-1 select-text">
                        {msg.content}
                      </span>
                      <div
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full select-none ${bubbleTheme}`}
                      >
                        <span className={`text-[10px] sm:text-[10.5px] font-normal leading-none ${metaColor}`}>
                          {formatDateTime(msg.createdAt).time}
                        </span>
                        {isOwn && (
                          <CheckCheck
                            size={13}
                            className={msg.isRead ? "text-sky-300" : "text-blue-200/60"}
                          />
                        )}
                      </div>
                    </div>
                  ) : hasImage && !hasContent ? (
                    <div className={`relative overflow-hidden rounded-2xl ${bubbleCorner} shadow-sm`}>
                      <img
                        src={msg.mediaUrl!}
                        alt="Attachment"
                        onClick={() => setPreviewImageUrl(msg.mediaUrl)}
                        className="max-h-64 w-auto object-cover block cursor-pointer"
                      />
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-[2px] text-white select-none">
                        <span className="text-[10px] sm:text-[10.5px] font-normal leading-none">
                          {formatDateTime(msg.createdAt).time}
                        </span>
                        {isOwn && (
                          <CheckCheck
                            size={13}
                            className={msg.isRead ? "text-sky-300" : "text-white/80"}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`overflow-hidden rounded-2xl ${bubbleCorner} ${bubbleTheme} text-xs sm:text-[13.5px]`}
                    >
                      {hasImage && (
                        <img
                          src={msg.mediaUrl!}
                          alt="Attachment"
                          onClick={() => setPreviewImageUrl(msg.mediaUrl)}
                          className="max-h-64 w-full object-cover block cursor-pointer"
                        />
                      )}
                      <div className="px-3.5 py-2 sm:px-4 sm:py-2.5">
                        {hasContent && (
                          <p className="text-left leading-relaxed whitespace-pre-wrap break-words">
                            {msg.content}
                          </p>
                        )}
                        <div className={`flex items-center justify-end gap-1 mt-1 -mb-0.5 select-none ${metaColor}`}>
                          <span className="text-[10px] sm:text-[10.5px] font-normal leading-none">
                            {formatDateTime(msg.createdAt).time}
                          </span>
                          {isOwn && (
                            <CheckCheck
                              size={13}
                              className={msg.isRead ? "text-sky-300" : "text-blue-200/60"}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoadingMore && (
            <div className="py-2 flex items-center justify-center gap-2 text-slate-500">
              <Loader2 size={15} className="animate-spin text-[#244673]" />
              <span className="text-[11px] font-medium text-slate-400">Loading more...</span>
            </div>
          )}
        </>
      )}

      {previewImageUrl && (
        <ChatImageModal
          imageUrl={previewImageUrl}
          onClose={() => setPreviewImageUrl(null)}
        />
      )}
    </div>
  );
}

export default MessageArea;
