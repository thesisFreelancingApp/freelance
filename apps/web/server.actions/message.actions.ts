"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

export async function sendMessage(receiverId: string, content: string) {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in to send a message");
  }

  try {
    // Check for an existing ChatRoom between the users in either direction
    let chatRoom = await prisma.chatRoom.findFirst({
      where: {
        OR: [
          { clientId: user.id, freelancerId: receiverId },
          { clientId: receiverId, freelancerId: user.id },
        ],
      },
    });

    // If no ChatRoom exists, create a new one
    if (!chatRoom) {
      chatRoom = await prisma.chatRoom.create({
        data: {
          clientId: user.id,
          freelancerId: receiverId,
        },
      });
    }

    // Create the message in the found or newly created chatRoom
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

    return { ...message, chatRoomId: chatRoom.id };
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }
}

export async function getMessages(
  chatRoomId: number,
  page: number = 1,
  pageSize: number = 20,
) {
  const skip = (page - 1) * pageSize;

  const [messages, totalCount] = await Promise.all([
    prisma.message.findMany({
      where: { chatRoomId },
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip,
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
    }),
    prisma.message.count({
      where: { chatRoomId },
    }),
  ]);

  return {
    messages: messages.reverse(), // Reverse to show oldest first
    hasMore: skip + pageSize < totalCount,
    totalCount,
  };
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

export async function getAllChatRooms() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const chatRooms = await prisma.chatRoom.findMany({
    where: {
      OR: [{ clientId: user.id }, { freelancerId: user.id }],
    },
    orderBy: { lastMessageAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
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

  return chatRooms.map((room) => ({
    id: room.id,
    otherUser: room.clientId === user.id ? room.freelancer : room.client,
    lastMessage: room.messages[0] || null,
  }));
}
