import { Prisma } from "../../../../../generated/prisma/client.js";
import type { ChatListItemDto } from "../../application/dto/chat.dto.js";

export const chatListSelect = {
  id: true,
  last_message_text: true,
  last_message_at: true,
  customer_unread_count: true,
  enterprise_unread_count: true,
  customer: {
    select: {
      name: true,
      profile_picture_key: true,
    },
  },
  enterprise: {
    select: {
      enterprise_name: true,
      users: {
        select: {
          profile_picture_key: true,
        },
        take: 1,
      },
    },
  },
} satisfies Prisma.chatsSelect;

export type ChatListRecord = Prisma.chatsGetPayload<{select: typeof chatListSelect}>;

export class ChatMapper {
  static toListItemDto(record: ChatListRecord, role: string): ChatListItemDto {
    const isCustomer = role === "CUSTOMER";

    return {
      id: record.id,
      name: isCustomer ? record.enterprise.enterprise_name : record.customer.name,
      avatarUrl: isCustomer
        ? (record.enterprise.users[0]?.profile_picture_key ?? null)
        : record.customer.profile_picture_key,
      lastMessageText: record.last_message_text,
      lastMessageAt: record.last_message_at,
      unreadCount: isCustomer
        ? record.customer_unread_count
        : record.enterprise_unread_count,
    };
  }
}
