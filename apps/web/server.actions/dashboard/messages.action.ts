"use server";
import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";

type MessagesWithRelationsType = Prisma.ChatRoomGetPayload<{
  select: {
    id: true;
    title: true;
    messages: { include: { sender: true } };
    createdAt: true;
  };
}>;

export type MessageType = {
  id: number;
  title: string | null;
  from: string | null;
  message: MessagesWithRelationsType;
  time: string | null;
};

export const getMessages = async () => {
  try {
    const chatrooms: MessagesWithRelationsType[] =
      await prisma.chatRoom.findMany({
        select: {
          id: true,
          title: true,
          messages: { include: { sender: true } },
          createdAt: true,
        },
      });

    const formattedMessages = chatrooms.map((chat) => ({
      id: Number(chat.id),
      title: chat.title,
      lastMessage:
        chat.messages.length > 0
          ? chat.messages[chat.messages.length - 1].content
          : "No messages",
      messages: chat.messages,
    }));

    return formattedMessages;
  } catch (error) {
    console.error("Error fetching disputes data:", error);
    return [];
  }
};

export type FormattedMessagesType = Awaited<ReturnType<typeof getMessages>>;
