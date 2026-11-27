import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from "react";
import { Paperclip, Smile, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useClickOutside } from "../../../hook/useClickOutside";
import { QUICK_EMOJIS } from "../constants/chat.constants";
import {ALLOWED_CHAT_IMAGE_TYPES,sendMessageSchema,validateChatImage,} from "../schemas/send-message.schema";
import type { SendMessagePayload } from "../types/message.types";

interface ChatInputBarProps {
  placeholder?: string;
  isSending?: boolean;
  onSend: (payload: SendMessagePayload) => Promise<boolean>;
}

export function ChatInputBar({ placeholder = "Type a message",isSending = false,onSend,}: ChatInputBarProps) {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  useClickOutside(emojiRef, () => setIsEmojiOpen(false));

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const error = validateChatImage(file);
    if (error) {
      toast.error(error);
      return;
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleEmojiSelect = (emoji: string) => {
    setText((prev) => `${prev}${emoji}`);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    const trimmed = text.trim();
    if (!trimmed && !selectedImage) return;

    const parsed = sendMessageSchema.safeParse({ content: trimmed || undefined });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Invalid message");
      return;
    }

    const sent = await onSend({
      content: parsed.data.content,
      image: selectedImage ?? undefined,
    });

    if (sent) {
      setText("");
      handleClearImage();
      setIsEmojiOpen(false);
    }
  };

  const canSubmit = !isSending && (Boolean(text.trim()) || Boolean(selectedImage));

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 px-3 pb-3 pt-1 sm:px-5 sm:pb-4 shrink-0"
    >
      {previewUrl && selectedImage && (
        <div className="mb-2.5 flex items-center gap-3 p-2 bg-white border border-slate-200 rounded-2xl w-fit max-w-full shadow-sm">
          <img
            src={previewUrl}
            alt={selectedImage.name}
            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200/70"
          />
          <div className="min-w-0 pr-1">
            <p className="text-xs font-semibold text-slate-700 truncate max-w-[160px] sm:max-w-[240px] m-0">
              {selectedImage.name}
            </p>
            <p className="text-[11px] text-slate-400 m-0">
              {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
          <button
            type="button"
            onClick={handleClearImage}
            disabled={isSending}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Remove image"
          >
            <X size={15} />
          </button>
        </div>
      )}

      <div className="flex items-center gap-1 sm:gap-1.5 bg-white border border-slate-200/90 rounded-full px-2 py-1.5 shadow-[0_2px_8px_rgba(15,23,42,0.06)] focus-within:ring-2 focus-within:ring-[#355982]/20 focus-within:border-[#355982] transition-all">
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_CHAT_IMAGE_TYPES.join(",")}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isSending}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer shrink-0 disabled:opacity-50"
          aria-label="Attach image"
        >
          <Paperclip size={18} />
        </button>

        <div ref={emojiRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsEmojiOpen((prev) => !prev)}
            disabled={isSending}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Add emoji"
          >
            <Smile size={18} />
          </button>

          {isEmojiOpen && (
            <div className="absolute bottom-13 left-0 w-56 p-2 bg-white border border-slate-200 rounded-xl shadow-lg grid grid-cols-4 gap-1 z-20">
              {QUICK_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiSelect(emoji)}
                  className="h-9 rounded-lg hover:bg-slate-100 text-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSending}
          placeholder={placeholder}
          className="flex-1 min-w-0 h-9 px-1.5 sm:px-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-transparent border-0 focus:outline-none disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center justify-center w-9 h-9 bg-[#2f5581] hover:bg-[#25456b] text-white rounded-full transition-all shadow-xs cursor-pointer active:scale-[0.96] shrink-0 disabled:opacity-45 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          {isSending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="translate-x-[1px]">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}

export default ChatInputBar;
