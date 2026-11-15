import { useState } from "react";
import { ConversationList } from "../../components/customer/ConversationList";
import { ChatHeader } from "../../components/customer/ChatHeader";
import { MessageArea } from "../../components/customer/MessageArea";
import { ChatInputBar } from "../../components/customer/ChatInputBar";
import type { ConversationItem, ChatMessage } from "../../types/conversation.types";

const mockConversations: ConversationItem[] = [
  {
    id: "1",
    name: "TechWorld Electronics",
    initials: "TE",
    avatarBg: "bg-[#2f5581]",
    topic: "Buy a New iPhone",
    lastMessage: "Yes, the Midnight Black finish is available...",
    timestamp: "10:42 AM",
    unread: false,
    contactPerson: "Vikram Mehta",
  },
  {
    id: "2",
    name: "SmartBuy Electronics",
    initials: "SE",
    avatarBg: "bg-[#183c66]",
    topic: "Apple iPhone 17 - 256GB",
    lastMessage: "We have revised our bulk discount rate...",
    timestamp: "Yesterday",
    unread: true,
    contactPerson: "Rahul Sharma",
  },
  {
    id: "3",
    name: "Digital Hub",
    initials: "DH",
    avatarBg: "bg-slate-100 text-slate-700 border border-slate-200",
    topic: "20 Office Chairs",
    lastMessage: "The warranty covers 3 years on mechanism...",
    timestamp: "Oct 12",
    unread: false,
    contactPerson: "Ananya Iyer",
  },
  {
    id: "4",
    name: "City Furniture",
    initials: "CF",
    avatarBg: "bg-slate-100 text-slate-700 border border-slate-200",
    topic: "Living Room Sofa Set",
    lastMessage: "Fabric swatch catalog dispatched via courier...",
    timestamp: "Sep 28",
    unread: false,
    contactPerson: "Karan Patel",
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: "m1",
    sender: "enterprise",
    senderName: "Vikram Mehta",
    senderInitials: "TE",
    text: "Hello! Thank you for your quotation request. We have the iPhone 17 256GB available in our primary warehouse.",
    timestamp: "10:30 AM",
  },
  {
    id: "m2",
    sender: "customer",
    senderName: "You",
    senderInitials: "AM",
    text: "Is the black color available?",
    timestamp: "10:33 AM",
  },
  {
    id: "m3",
    sender: "enterprise",
    senderName: "Vikram Mehta",
    senderInitials: "TE",
    text: "Yes, the Midnight Black finish is available for immediate dispatch. The quoted price includes the 1-year Apple manufacturer warranty plus complimentary insurance for transit.",
    timestamp: "10:38 AM",
  },
  {
    id: "m4",
    sender: "customer",
    senderName: "You",
    senderInitials: "AM",
    text: "Can you confirm the delivery time to Kozhikode?",
    timestamp: "10:42 AM",
  },
];

export function CustomerConversationsPage() {
  const [selectedId, setSelectedId] = useState<string>("1");
  const [filterTab, setFilterTab] = useState<"all" | "unread">("all");
  const [mobileShowChat, setMobileShowChat] = useState<boolean>(false);

  const selectedConversation =
    mockConversations.find((c) => c.id === selectedId) || mockConversations[0];

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    setMobileShowChat(true);
  };

  return (
    <div className="w-full h-full flex bg-white overflow-hidden animate-in fade-in duration-150">
      {/* Left Column: Conversations List (Modular Component) */}
      <ConversationList
        conversations={mockConversations}
        selectedId={selectedId}
        onSelect={handleSelectConversation}
        filterTab={filterTab}
        onFilterChange={setFilterTab}
        className={mobileShowChat ? "hidden md:flex" : "flex"}
      />

      {/* Right Column: Active Chat Area */}
      <section
        className={`flex-1 flex flex-col min-w-0 bg-white h-full ${
          !mobileShowChat ? "hidden md:flex" : "flex"
        }`}
        aria-label="Active Chat"
      >
        {/* Chat Header Component */}
        <ChatHeader
          conversation={selectedConversation}
          onBack={() => setMobileShowChat(false)}
        />

        {/* Messages Feed Component with custom slim scrollbar */}
        <MessageArea messages={mockMessages} />

        {/* Bottom Chat Input Bar Component */}
        <ChatInputBar />
      </section>
    </div>
  );
}

export default CustomerConversationsPage;
