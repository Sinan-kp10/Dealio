import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../../hook/useDebounce";
import socket from "../../../services/socket.service";
import { handleApiError } from "../../../utils/errorHandler";
import { ChatHeader } from "./ChatHeader";
import { MessageArea } from "./MessageArea";
import { ChatInputBar } from "./ChatInputBar";
import { ChatList } from "./ChatList";
import { ChatPanelSkeleton } from "./loading/ChatPanelSkeleton";
import { CHAT_WALLPAPER_SVG } from "../constants/chat.constants";
import {
  markChatAsReadViaSocket,
  sendTextMessageViaSocket,
  useChatSocket,
  type ChatListUpdatePayload,
  type MessagesReadPayload,
} from "../hooks/useChatSocket";
import { getChats, getMessages, sendMessage, startChat } from "../services/chat.service";
import type { ChatFilterTab, ChatListItem } from "../types/chat.types";
import type { MessageItem, MessageSenderRole, SendMessagePayload } from "../types/message.types";

interface ChatWorkspaceProps {
  currentRole: MessageSenderRole;
}

export function ChatWorkspace({ currentRole }: ChatWorkspaceProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const targetId = searchParams.get("targetId");

  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);
  const [filterTab, setFilterTab] = useState<ChatFilterTab>("all");
  const [search, setSearch] = useState("");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [totalUnreadChats, setTotalUnreadChats] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [mobileShowChat, setMobileShowChat] = useState(Boolean(targetId));

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [messagesCursor, setMessagesCursor] = useState<string | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const selectedId = selectedChat?.id ?? null;
  const debouncedSearch = useDebounce(search, 500);

  const handleIncomingMessage = useCallback(
    (incomingMessage: MessageItem) => {
      if (incomingMessage.chatId !== selectedId) return;
      setMessages((prev) =>
        prev.some((msg) => msg.id === incomingMessage.id)
          ? prev
          : [incomingMessage, ...prev]
      );
      if (incomingMessage.senderRole !== currentRole) {
        markChatAsReadViaSocket(selectedId);
      }
    },
    [selectedId, currentRole]
  );

  const updateChatPreview = useCallback(
    (update: ChatListUpdatePayload, incrementUnread: boolean) => {
      setChats((prev) => {
        const target = prev.find((c) => c.id === update.chatId);
        if (!target) return prev;

        const updated: ChatListItem = {
          ...target,
          lastMessageText: update.lastMessageText,
          lastMessageAt: update.lastMessageAt,
          unreadCount: incrementUnread ? target.unreadCount + 1 : target.unreadCount,
        };
        return [updated, ...prev.filter((c) => c.id !== update.chatId)];
      });
    },
    []
  );

  const handleSocketListUpdate = useCallback(
    (update: ChatListUpdatePayload) => {
      const isUnreadChat = update.chatId !== selectedId;
      if (isUnreadChat) {
        const existing = chats.find((c) => c.id === update.chatId);
        if (existing && existing.unreadCount === 0) {
          setTotalUnreadChats((prev) => prev + 1);
        }
      }
      updateChatPreview(update, isUnreadChat);
    },
    [selectedId, chats, updateChatPreview]
  );

  const handleMessagesRead = useCallback(
    (payload: MessagesReadPayload) => {
      if (payload.chatId !== selectedId || payload.readByRole === currentRole) return;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.senderRole === currentRole && !msg.isRead
            ? { ...msg, isRead: true }
            : msg
        )
      );
    },
    [selectedId, currentRole]
  );

  const isRecipientOnline = useChatSocket({
    selectedId,
    participantUserId: selectedChat?.participantUserId ?? null,
    onNewMessage: handleIncomingMessage,
    onChatListUpdate: handleSocketListUpdate,
    onMessagesRead: handleMessagesRead,
  });

  useEffect(() => {
    if (!targetId) return;
    let isMounted = true;

    const openTargetChat = async () => {
      setMobileShowChat(true);
      try {
        const chat = await startChat(targetId);
        if (!isMounted) return;
        if (chat.unreadCount > 0) {
          setTotalUnreadChats((prev) => Math.max(0, prev - 1));
        }
        const clearedChat: ChatListItem = { ...chat, unreadCount: 0 };
        setChats((prev) => [clearedChat, ...prev.filter((c) => c.id !== chat.id)]);
        setSelectedChat(clearedChat);
      } catch (error) {
        if (isMounted) {
          handleApiError(error, "Failed to open chat");
          setMobileShowChat(false);
        }
      } finally {
        if (isMounted) {
          setSearchParams({}, { replace: true });
        }
      }
    };

    openTargetChat();
    return () => {
      isMounted = false;
    };
  }, [targetId, setSearchParams]);

  useEffect(() => {
    if (targetId) return;
    let isMounted = true;

    const fetchChats = async () => {
      setIsLoading(true);
      try {
        const data = await getChats({
          filter: filterTab,
          search: debouncedSearch.trim() || undefined,
        });
        if (!isMounted) return;
        setChats(data.items);
        setNextCursor(data.nextCursor);
        setTotalUnreadChats(data.totalUnreadChats);
      } catch (error) {
        if (isMounted) {
          handleApiError(error, "Failed to load chats");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchChats();
    return () => {
      isMounted = false;
    };
  }, [filterTab, debouncedSearch, targetId]);

  useEffect(() => {
    if (!selectedId) return;

    let isMounted = true;

    const fetchMessages = async () => {
      setIsLoadingMessages(true);
      try {
        const data = await getMessages(selectedId);
        if (!isMounted) return;
        setMessages(data.items);
        setMessagesCursor(data.nextCursor);
      } catch (error) {
        if (isMounted) {
          handleApiError(error, "Failed to load messages");
        }
      } finally {
        if (isMounted) {
          setIsLoadingMessages(false);
        }
      }
    };

    fetchMessages();
    return () => {
      isMounted = false;
    };
  }, [selectedId]);

  const handleLoadMore = async () => {
    if (!nextCursor || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const data = await getChats({
        filter: filterTab,
        search: debouncedSearch.trim() || undefined,
        cursor: nextCursor,
      });
      setChats((prev) => [...prev, ...data.items]);
      setNextCursor(data.nextCursor);
      setTotalUnreadChats(data.totalUnreadChats);
    } catch (error) {
      handleApiError(error, "Failed to load more chats");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleLoadMoreMessages = async () => {
    if (!selectedId || !messagesCursor || isLoadingMoreMessages) return;
    setIsLoadingMoreMessages(true);
    try {
      const data = await getMessages(selectedId, { cursor: messagesCursor });
      setMessages((prev) => [...prev, ...data.items]);
      setMessagesCursor(data.nextCursor);
    } catch (error) {
      handleApiError(error, "Failed to load older messages");
    } finally {
      setIsLoadingMoreMessages(false);
    }
  };

  const handleSelectChat = (id: string) => {
    if (id !== selectedId) {
      setMessages([]);
      setMessagesCursor(null);
    }
    const chat = chats.find((c) => c.id === id);
    if (chat) {
      if (chat.unreadCount > 0) {
        setChats((prev) =>
          prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
        );
        setTotalUnreadChats((prev) => Math.max(0, prev - 1));
      }
      setSelectedChat({ ...chat, unreadCount: 0 });
    }
    setMobileShowChat(true);
  };

  const handleSendMessage = async (payload: SendMessagePayload): Promise<boolean> => {
    if (!selectedChat || isSending) return false;
    setIsSending(true);
    try {
      const useSocketForText = !payload.image && Boolean(payload.content) && socket.connected;
      const newMessage = useSocketForText
        ? await sendTextMessageViaSocket(selectedChat.id, payload.content!)
        : await sendMessage(selectedChat.id, payload);

      setMessages((prev) =>
        prev.some((msg) => msg.id === newMessage.id) ? prev : [newMessage, ...prev]
      );

      const preview = newMessage.content || "Photo";
      setSelectedChat({
        ...selectedChat,
        lastMessageText: preview,
        lastMessageAt: newMessage.createdAt,
      });
      updateChatPreview(
        {
          chatId: selectedChat.id,
          lastMessageText: preview,
          lastMessageAt: newMessage.createdAt,
          senderId: newMessage.senderId,
        },
        false
      );
      return true;
    } catch (error) {
      handleApiError(error, "Failed to send message");
      return false;
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full h-full flex bg-slate-100 border-t border-slate-200/90 overflow-hidden animate-in fade-in duration-150">
      <ChatList
        chats={chats}
        selectedId={selectedId}
        onSelect={handleSelectChat}
        filterTab={filterTab}
        onFilterChange={setFilterTab}
        search={search}
        onSearchChange={setSearch}
        totalUnreadChats={totalUnreadChats}
        isLoading={isLoading}
        hasMore={Boolean(nextCursor)}
        isLoadingMore={isLoadingMore}
        onLoadMore={handleLoadMore}
        className={mobileShowChat ? "hidden md:flex" : "flex"}
      />

      <section
        className={`flex-1 flex flex-col min-w-0 bg-[#f8fafc] h-full ${
          !mobileShowChat ? "hidden md:flex" : "flex"
        }`}
        aria-label="Active Chat"
      >
        {selectedChat ? (
          <>
            <ChatHeader
              name={selectedChat.name}
              avatarUrl={selectedChat.avatarUrl}
              isOnline={isRecipientOnline}
              onBack={() => setMobileShowChat(false)}
            />
            <div
              className="flex-1 flex flex-col min-h-0 bg-[#e6edf5]"
              style={{
                backgroundImage: CHAT_WALLPAPER_SVG,
                backgroundRepeat: "repeat",
                backgroundSize: "180px 180px",
              }}
            >
              <MessageArea
                messages={messages}
                currentRole={currentRole}
                isLoading={isLoadingMessages}
                hasMore={Boolean(messagesCursor)}
                isLoadingMore={isLoadingMoreMessages}
                onLoadMore={handleLoadMoreMessages}
              />
              <ChatInputBar isSending={isSending} onSend={handleSendMessage} />
            </div>
          </>
        ) : targetId ? (
          <ChatPanelSkeleton />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#f4f7fb]">
            <img
              src="/chat-image.png"
              alt="Dealio Chat"
              className="w-64 sm:w-80 md:w-96 lg:w-[420px] h-auto object-contain mb-2 select-none"
            />
            <h2 className="text-base sm:text-lg font-bold text-[#0e2238] m-0">
              Dealio Chat
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xs mt-1.5 m-0">
              Select a chat from the list to view messages and start chatting.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ChatWorkspace;
