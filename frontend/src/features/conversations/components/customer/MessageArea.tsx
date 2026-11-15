import { CheckCheck } from "lucide-react";
import type { ChatMessage } from "../../types/conversation.types";

interface MessageAreaProps {
  messages: ChatMessage[];
  dateLabel?: string;
}

export function MessageArea({
  messages,
  dateLabel = "Today, October 15, 2026",
}: MessageAreaProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5 sm:space-y-3 bg-[#f0f4f8] custom-scrollbar">
      {/* Date Badge */}
      <div className="flex justify-center my-2">
        <span className="px-3.5 py-1 bg-white/90 text-slate-500 text-[11px] font-medium rounded-full border border-slate-200/70 shadow-2xs">
          {dateLabel}
        </span>
      </div>

      {/* Messages Feed */}
      {messages.map((msg) => {
        const isCustomer = msg.sender === "customer";

        if (isCustomer) {
          return (
            <div
              key={msg.id}
              className="flex justify-end ml-auto max-w-[85%] sm:max-w-md lg:max-w-lg"
            >
              <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-tr-xs bg-[#2f5581] text-white text-xs sm:text-[13.5px] shadow-[0_1px_2px_rgba(47,85,129,0.2)]">
                <p className="text-left leading-relaxed">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1 -mb-0.5 text-blue-100/75 select-none">
                  <span className="text-[10px] sm:text-[10.5px] font-normal leading-none">
                    {msg.timestamp}
                  </span>
                  <CheckCheck size={13} className="text-blue-200" />
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={msg.id}
            className="flex justify-start mr-auto max-w-[85%] sm:max-w-md lg:max-w-lg"
          >
            <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-tl-xs bg-white text-slate-800 text-xs sm:text-[13.5px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-slate-200/70">
              <p className="text-left leading-relaxed">{msg.text}</p>
              <div className="flex items-center justify-end mt-1 -mb-0.5 text-slate-400 select-none">
                <span className="text-[10px] sm:text-[10.5px] font-normal leading-none">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageArea;
