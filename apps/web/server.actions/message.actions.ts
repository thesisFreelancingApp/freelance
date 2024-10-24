"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

export async function sendMessage(receiverId: string, content: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to send a message");
  }
  console.log(
    "here ya lhoooooooooo ==================================================",
    user.id,
    receiverId,
  );

  // Find or create a chat room
  let chatRoom = await prisma.chatRoom.findFirst({
    where: {
      OR: [
        { clientId: user.id, freelancerId: receiverId },
        { clientId: receiverId, freelancerId: user.id },
      ],
    },
  });

  if (!chatRoom) {
    console.log("chatRoom not found, creating new one", user.id, receiverId);

    chatRoom = await prisma.chatRoom.create({
      data: {
        clientId: user.id,
        freelancerId: receiverId,
      },
    });
  }

  // Create the message
  const message = await prisma.message.create({
    data: {
      chatRoomId: chatRoom.id,
      senderId: user.id,
      content,
    },
  });

  // Update lastMessageAt in ChatRoom
  await prisma.chatRoom.update({
    where: { id: chatRoom.id },
    data: { lastMessageAt: message.createdAt },
  });

  // Broadcast the new message using Supabase Realtime
  await supabase.from("messages").insert({
    id: message.id,
    content: message.content,
    senderId: message.senderId,
    chatRoomId: message.chatRoomId,
    createdAt: message.createdAt,
  });

  return { message, chatRoomId: chatRoom.id };
}

export async function getMessages(chatRoomId: number) {
  return prisma.message.findMany({
    where: { chatRoomId },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profilePic: true,
        },
      },
    },
  });
}

export async function getOrCreateChatRoom(receiverId: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to access chat rooms");
  }

  let chatRoom = await prisma.chatRoom.findFirst({
    where: {
      OR: [
        { clientId: user.id, freelancerId: receiverId },
        { clientId: receiverId, freelancerId: user.id },
      ],
    },
  });

  if (!chatRoom) {
    chatRoom = await prisma.chatRoom.create({
      data: {
        clientId: user.id,
        freelancerId: receiverId,
      },
    });
  }

  return chatRoom.id;
}

export async function getRecentMessages() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const recentChatRooms = await prisma.chatRoom.findMany({
    where: {
      OR: [{ clientId: user.id }, { freelancerId: user.id }],
    },
    orderBy: { lastMessageAt: "desc" },
    take: 5,
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePic: true,
            },
          },
        },
      },
      client: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profilePic: true,
        },
      },
      freelancer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profilePic: true,
        },
      },
    },
  });

  const recentMessages = recentChatRooms.map((chatRoom) => {
    const message = chatRoom.messages[0];
    const otherUser =
      chatRoom.clientId === user.id ? chatRoom.freelancer : chatRoom.client;

    return {
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      sender: message.sender,
      otherUser: otherUser,
    };
  });

  const unreadCount = await prisma.message.count({
    where: {
      OR: [
        { chatRoom: { clientId: user.id } },
        { chatRoom: { freelancerId: user.id } },
      ],
      NOT: { senderId: user.id },
      isRead: false,
    },
  });

  return { messages: recentMessages, unreadCount };
}
