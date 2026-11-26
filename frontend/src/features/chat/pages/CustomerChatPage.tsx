import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MessageCircleMore } from "lucide-react";
import useDebounce from "../../../hook/useDebounce";
import { handleApiError } from "../../../utils/errorHandler";
import { ChatHeader } from "../components/ChatHeader";
import { MessageArea } from "../components/MessageArea";
import { ChatInputBar } from "../components/ChatInputBar";
import { ChatPanelSkeleton } from "../components/loading/ChatPanelSkeleton";
import { getChats, getMessages, startChat } from "../services/chat.service";
import type { ChatFilterTab, ChatListItem } from "../types/chat.types";
import type { MessageItem } from "../types/message.types";
import ChatList from "../components/ChatList";

export function CustomerChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const targetId = searchParams.get("targetId");

  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);
  const [filterTab, setFilterTab] = useState<ChatFilterTab>("all");
  const [search, setSearch] = useState("");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalUnreadChats, setTotalUnreadChats] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isStartingChat, setIsStartingChat] = useState(Boolean(targetId));
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [mobileShowChat, setMobileShowChat] = useState(Boolean(targetId));

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [messagesCursor, setMessagesCursor] = useState<string | null>(null);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false);

  const selectedId = selectedChat?.id ?? null;
  const debouncedSearch = useDebounce(search, 500);


  useEffect(() => {
    if (!targetId) return;
    let isMounted = true;

    const openTargetChat = async () => {
      setIsStartingChat(true);
      setMobileShowChat(true);
      try {
        const chat = await startChat(targetId);
        if (!isMounted) return;
        setChats((prev) => [chat, ...prev.filter((c) => c.id !== chat.id)]);
        setSelectedChat(chat);
      } catch (error) {
        if (isMounted) {
          handleApiError(error, "Failed to open chat");
          setMobileShowChat(false);
        }
      } finally {
        if (isMounted) {
          setIsStartingChat(false);
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
        setHasMore(data.hasMore);
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
        setHasMoreMessages(data.hasMore);
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
      setHasMore(data.hasMore);
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
      setMessages((prev) => [...data.items, ...prev]);
      setMessagesCursor(data.nextCursor);
      setHasMoreMessages(data.hasMore);
    } catch (error) {
      handleApiError(error, "Failed to load older messages");
    } finally {
      setIsLoadingMoreMessages(false);
    }
  };

  const handleSelectChat = (id: string) => {
    const chat = chats.find((c) => c.id === id) ?? null;
    if (chat) {
      setSelectedChat(chat);
    }
    setMobileShowChat(true);
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
        hasMore={hasMore}
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
              onBack={() => setMobileShowChat(false)}
            />
            <MessageArea
              messages={messages}
              currentRole="CUSTOMER"
              isLoading={isLoadingMessages}
              hasMore={hasMoreMessages}
              isLoadingMore={isLoadingMoreMessages}
              onLoadMore={handleLoadMoreMessages}
            />
            <ChatInputBar />
          </>
        ) : isStartingChat || targetId ? (
          <ChatPanelSkeleton />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#f4f7fb]">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-[#2f5581] mb-4">
              <MessageCircleMore size={30} />
            </div>
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

export default CustomerChatPage;
