import { Prisma } from "../../../../../generated/prisma/client.js";
import { prisma } from "../../../../infrastructure/database/prisma/prisma-client.js";
import type {
  ChatAccessDto,
  ChatFiltersDto,
  ChatListItemDto,
  PaginatedChatsDto,
} from "../../application/dto/chat.dto.js";
import type { PaginatedMessagesDto } from "../../application/dto/message.dto.js";
import type { IChatRepository } from "../../domain/repositories/chat.repository.js";
import { ChatMapper, chatListSelect } from "../mappers/chat.mapper.js";
import { MessageMapper, messageSelect } from "../mappers/message.mapper.js";

const DEFAULT_CHAT_LIMIT = 20;
const DEFAULT_MESSAGE_LIMIT = 30;

export class PrismaChatRepository implements IChatRepository {
  findById = async (chatId: string): Promise<ChatAccessDto | null> => {
    const chat = await prisma.chats.findUnique({
      where: { id: chatId },
      select: {
        id: true,
        customer_id: true,
        enterprise_id: true,
      },
    });

    if (!chat) {
      return null;
    }

    return {
      id: chat.id,
      customerId: chat.customer_id,
      enterpriseId: chat.enterprise_id,
    };
  };
  findEnterpriseIdByUserId = async (userId: string): Promise<string | null> => {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { enterprise_id: true },
    });

    return user?.enterprise_id ?? null;
  };

  getChats = async (filters: ChatFiltersDto): Promise<PaginatedChatsDto> => {
    const { role, userId, filter, search, cursor } = filters;
    const limit = DEFAULT_CHAT_LIMIT;
    const isCustomer = role === "CUSTOMER";

    const baseScope: Prisma.chatsWhereInput = isCustomer? { customer_id: userId } : { enterprise_id: userId };

    const where: Prisma.chatsWhereInput = {
      ...baseScope,
      ...(filter === "unread" ? isCustomer ? {customer_unread_count: {gt: 0}} : {enterprise_unread_count: {gt: 0}}: {}),
      ...(search
        ? isCustomer
          ? { enterprise: { enterprise_name: { contains: search, mode: "insensitive" } } }
          : { customer: { name: { contains: search, mode: "insensitive" } } }
        : {}),
    };

    const unreadWhere: Prisma.chatsWhereInput = {
      ...baseScope,
      ...(isCustomer? { customer_unread_count: { gt: 0 } } : { enterprise_unread_count: { gt: 0 } }),
    };

    const [rows, totalUnreadChats] = await Promise.all([
      prisma.chats.findMany({
        where,
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        take: limit + 1,
        orderBy: [
          { last_message_at: "desc" },
          { id: "desc" },
        ],
        select: chatListSelect,
      }),
      prisma.chats.count({
        where: unreadWhere,
      }),
    ]);

    const hasMore = rows.length > limit;
    const sliced = rows.slice(0, limit);

    return {
      items: sliced.map((row) => ChatMapper.toListItemDto(row, role)),
      nextCursor: hasMore ? sliced[sliced.length - 1].id : null,
      hasMore,
      totalUnreadChats,
    };
  };

  hasSharedQuotation = async (customerId: string,enterpriseId: string): Promise<boolean> => {
    const [requestMatch, proposalMatch] = await Promise.all([
      prisma.enterprise_quotation_requests.findFirst({
        where: {
          enterprise_id: enterpriseId,
          quotation: { customer_id: customerId },
        },
        select: { id: true },
      }),
      prisma.proposals.findFirst({
        where: {
          enterprise_id: enterpriseId,
          quotation: { customer_id: customerId },
        },
        select: { id: true },
      }),
    ]);

    return Boolean(requestMatch || proposalMatch);
  };

  findChatByParticipants = async (customerId: string,enterpriseId: string,role: string): Promise<ChatListItemDto | null> => {
    const existing = await prisma.chats.findUnique({
      where: {
        customer_id_enterprise_id: {
          customer_id: customerId,
          enterprise_id: enterpriseId,
        },
      },
      select: chatListSelect,
    });

    return existing ? ChatMapper.toListItemDto(existing, role) : null;
  };

  createChat = async (customerId: string,enterpriseId: string,role: string): Promise<ChatListItemDto> => {
    const created = await prisma.chats.create({
      data: {
        customer_id: customerId,
        enterprise_id: enterpriseId,
      },
      select: chatListSelect,
    });

    return ChatMapper.toListItemDto(created, role);
  };

  getMessages = async (chatId: string,cursor?: string): Promise<PaginatedMessagesDto> => {
    const limit = DEFAULT_MESSAGE_LIMIT;

    const rows = await prisma.messages.findMany({
      where: { chat_id: chatId },
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      take: limit + 1,
      orderBy: [
        { created_at: "desc" },
        { id: "desc" },
      ],
      select: messageSelect,
    });

    const hasMore = rows.length > limit;
    const sliced = rows.slice(0, limit);
    const nextCursor = hasMore ? sliced[sliced.length - 1].id : null;

    return {
      items: sliced.reverse().map(MessageMapper.toDto),
      nextCursor,
      hasMore,
    };
  };
}
