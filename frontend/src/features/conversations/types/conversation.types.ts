export interface ConversationItem {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  topic: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  contactPerson: string;
}

export interface ChatMessage {
  id: string;
  sender: "enterprise" | "customer";
  senderName: string;
  senderInitials: string;
  text: string;
  timestamp: string;
}
