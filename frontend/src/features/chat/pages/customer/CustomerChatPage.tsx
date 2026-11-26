import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MessageCircleMore } from "lucide-react";
import useDebounce from "../../../../hook/useDebounce";
import { handleApiError } from "../../../../utils/errorHandler";
import { ChatList } from "../../components/customer/ChatList";
import { ChatHeader } from "../../components/customer/ChatHeader";
import { MessageArea } from "../../components/customer/MessageArea";
import { ChatInputBar } from "../../components/customer/ChatInputBar";
import { ChatPanelSkeleton } from "../../components/customer/loading/ChatPanelSkeleton";
import { getChats, startChat } from "../../services/chat.service";
import type { ChatFilterTab, ChatListItem } from "../../types/chat.types";

export function CustomerChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const targetId = searchParams.get("targetId");

  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterTab, setFilterTab] = useState<ChatFilterTab>("all");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalUnreadChats, setTotalUnreadChats] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isStartingChat, setIsStartingChat] = useState(Boolean(targetId));
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [mobileShowChat, setMobileShowChat] = useState(Boolean(targetId));

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
        setSelectedId(chat.id);
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

  const selectedChat = chats.find((c) => c.id === selectedId) ?? null;

  const handleSelectChat = (id: string) => {
    setSelectedId(id);
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
            <MessageArea messages={[]} />
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
